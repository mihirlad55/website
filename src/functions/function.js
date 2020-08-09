const fs = require('fs');
const escapeHtml = require('escape-html');
const {Storage} = require('@google-cloud/storage');
const {Octokit} = require('@octokit/rest');

const GITHUB_USERNAME = 'mihirlad55';
const BUCKET = 'mihirlad-data'
const TMP_STATS_PATH = '/tmp/stats.json';
const BUCKET_STATS_PATH = 'stats.json';
const GITHUB_AUTH_TOKEN = process.env.GITHUB_AUTH_TOKEN;

const octokit = new Octokit({
  auth: GITHUB_AUTH_TOKEN
});
const storage = new Storage();

async function uploadStats(path) {
  await storage.bucket(BUCKET).upload(path, {
    gzip: true,
    public: true,
    destination: BUCKET_STATS_PATH,
    metadata: {
      cacheControl: 'public, max-age=86400',
      contentType: 'application/json'
    }
  });
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

exports.updateStats = async (message, context) => {
  const stats = await compileStats(GITHUB_USERNAME);
  const statsStr = JSON.stringify(stats);
  console.log(statsStr);

  fs.writeFileSync(TMP_STATS_PATH, statsStr);
  console.log(`stats written to ${TMP_STATS_PATH}`);

  await uploadStats(TMP_STATS_PATH);
  console.log(`${TMP_STATS_PATH} uploaded to ${BUCKET}`)
};

exports.getStats = (req, res) => {
  let dateUpdated;
  const file = storage.bucket(BUCKET).file(BUCKET_STATS_PATH);

  file.getMetadata((err, metadata, apiResponse) => {
    dateUpdated = metadata.updated;
  });

  file.download((err, contents) => {
    // Allow cross-domain requests
    const stats = JSON.parse(contents.toString('utf-8'));
    const data = {
      dateUpdated: dateUpdated,
      stats: stats
    };
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send(JSON.stringify(data));
  });
};
