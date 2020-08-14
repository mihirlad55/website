const fs = require('fs');
const got = require('got');
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const {Storage} = require('@google-cloud/storage');
const {Octokit} = require('@octokit/rest');

const GITHUB_USERNAME = 'mihirlad55';
const BUCKET = 'mihirlad-data'
const BUCKET_STATS_PATH = 'stats.json';
const BUCKET_PROJECTS_PATH = 'projects.json';
const GITHUB_AUTH_TOKEN_SECRET_NAME = process.env.GITHUB_AUTH_TOKEN_SECRET_NAME;
const BASE_PROJECTS_URL = process.env.BASE_PROJECTS_URL;

var octokit;

async function initializeOctokit() {
  console.log(GITHUB_AUTH_TOKEN_SECRET_NAME);
  octokit = new Octokit({
    auth: await getSecret(GITHUB_AUTH_TOKEN_SECRET_NAME)
  });
}

async function uploadJSON(json, destination) {
  const storage = new Storage();
  const file = storage.bucket(BUCKET).file(destination);
  await file.save(JSON.stringify(json), {
    gzip: true,
    public: true,
    metadata: {
      cacheControl: 'public, max-age=86400',
      contentType: 'application/json'
    }
  });
}

async function downloadJSON(path, key) {
  let dateUpdated;
  const storage = new Storage();
  const file = storage.bucket(BUCKET).file(path);

  file.getMetadata((err, metadata, apiResponse) => {
    dateUpdated = metadata.updated;
  });

  const [resp] = await file.download();
  const json = JSON.parse(resp.toString('utf-8'));

  const data = {
    dateUpdated: dateUpdated,
    [key]: json
  }

  return data;
}

async function getSecret(name) {
  const client = new SecretManagerServiceClient();
  const [accessResponse] = await client.accessSecretVersion({
    name: name
  })

  return accessResponse.payload.data.toString('utf8');
}

async function getContributorStats(repo, owner, user) {
  let totalCommits = 0;
  let totalAdditions = 0;
  let totalDeletions = 0;

  let {data} = await octokit.repos.getContributorsStats({
    owner: owner,
    repo: repo
  });

  for (const userData of data) {
    if (userData.author.login === user) {
      for (const week of userData.weeks) {
        totalAdditions += week.a;
        totalDeletions += week.d;
      }
      totalCommits += userData.total;
      break;
    }
  }

  return {
    totalCommits: totalCommits,
    totalAdditions: totalAdditions,
    totalDeletions: totalDeletions
  };
}

async function gatherGitHubStats(user) {
  let languages = new Set();
  let res = {
    totalStars: 0,
    totalRepos: 0,
    totalActiveRepos: 0,
    totalCommits: 0,
    totalAdditions: 0,
    totalDeletions: 0,
    totalLanguages: 0
  }

  let {data} = await octokit.repos.listForUser({
    username: user,
    type: "public"
  });

  for (const repo of data) {
    console.log(`Processing repo ${repo.name}...`)
    res.totalStars += repo.stargazers_count;
    res.totalRepos++;

    if (!repo.archived && !repo.disabled)
      res.totalActiveRepos++;

    const contributorStats = await getContributorStats(repo.name,
      repo.owner.login, user);
    res.totalCommits += contributorStats.totalCommits;
    res.totalAdditions += contributorStats.totalAdditions;
    res.totalDeletions += contributorStats.totalDeletions;

    // Only consider repos contributed to
    if (contributorStats.totalCommits > 0) {
      const repoLanguages = await getRepoLanguages(repo.name, repo.owner.login);
      for (const l of repoLanguages)
        languages.add(l);
    }
  }

  res.totalLanguages = languages.size;

  return res;
}

async function getRepoLanguages(repo, owner) {
  const {data} = await octokit.repos.listLanguages({
    owner: owner,
    repo: repo
  });

  const languages = Object.keys(data);

  return languages;
}

async function compileStats(username) {
  const githubStats = await gatherGitHubStats(username);

  const stats = [
    {
      name: 'GitHub Stargazers',
      description: 'Number of stars given by others to my GitHub repositories',
      value: githubStats.totalStars
    },
    {
      name: 'GitHub Projects',
      description: 'Total number of public GitHub repositories',
      value: githubStats.totalRepos
    },
    {
      name: 'Active GitHub Projects',
      description: 'Total number of active public GitHub repositories',
      value: githubStats.totalActiveRepos,
    },
    {
      name: 'GitHub Commits',
      description: 'Total number of commits to public GitHub repositories',
      value: githubStats.totalCommits
    },
    {
      name: 'GitHub Additions',
      description: 'Total number of lines added to public GitHub repositories',
      value: githubStats.totalAdditions
    },
    {
      name: 'GitHub Deletions',
      description: 'Total number of lines removed from public GitHub repositories',
      value: githubStats.totalDeletions
    },
    {
      name: 'Languages Used in Repos',
      description: 'Total number of languages in which code was committed to public GitHub repositories',
      value: githubStats.totalLanguages
    }
  ];

  return stats;
}

async function getBaseProjects() {
  try {
    const resp = await got(BASE_PROJECTS_URL);
    const projects = JSON.parse(resp.body);
    console.log(projects);
    return projects;
  } catch (e) {
    console.error(e.resp.body);
  }
}

async function getGitProjectInfo(domain, owner, id, username) {
  let gitInfo = {
    domain: domain,
    owner: owner,
    projectUrl: `https://${domain}.com/${owner}/${id}`,
    isFork: false,
    description: '',
    topics: [],
    languages: [],
    stars: 0,
    forks: 0,
    commits: 0,
    additions: 0,
    deletions: 0
  };

  if (domain === 'github') {
    gitInfo.languages = await getRepoLanguages(id, owner);

    const {data: repo} = await octokit.repos.get({owner: owner, repo: id});
    gitInfo.stars = repo.stargazers_count;
    gitInfo.forks = repo.forks_count;
    gitInfo.topics = repo.topics;
    gitInfo.description = (repo.description ? repo.description : '');
    gitInfo.isFork = repo.fork;

    const contributorStats = await getContributorStats(id, owner, username);
    gitInfo.additions = contributorStats.totalAdditions;
    gitInfo.deletions = contributorStats.totalDeletions;
    gitInfo.commits = contributorStats.totalCommits;

    const {data} = await octokit.repos.getAllTopics({owner: owner, repo: id});
    gitInfo.topics = data.names;

    return gitInfo;
  } else if (domain === 'gitlab') {

  }
}

exports.updateStats = async (message, context) => {
  await initializeOctokit();
  const stats = await compileStats(GITHUB_USERNAME);

  await uploadJSON(stats, BUCKET_STATS_PATH);
  console.log(`${stats} uploaded to ${BUCKET}:${BUCKET_STATS_PATH}`)
};

exports.getStats = async (req, res) => {
  const stats = await downloadJSON(BUCKET_STATS_PATH, 'stats');
  res.set('Access-Control-Allow-Origin', '*');
  res.status(200).send(JSON.stringify(stats));
};

exports.updateProjects = async (message, context) => {
  await initializeOctokit();

  let projects = await getBaseProjects();
  for (let p of projects) {
    if (p.git && p.git.domain && p.git.owner && p.id)
      p.git = await getGitProjectInfo(p.git.domain, p.git.owner, p.id,
        GITHUB_USERNAME);
  }
  console.log(projects);
  await uploadJSON(projects, BUCKET_PROJECTS_PATH);
};

exports.getProjects = async (req, res) => {
  const projects = await downloadJSON(BUCKET_PROJECTS_PATH, 'projects');
  res.set('Access-Control-Allow-Origin', '*');
  res.status(200).send(JSON.stringify(projects));
};
