const fs = require('fs');
const escapeHtml = require('escape-html');
const {Storage} = require('@google-cloud/storage');
const {Octokit} = require('@octokit/rest');

const username = "mihirlad55";
const bucket = "mihirlad-data"
const tmpStatsPath = "/tmp/stats.json";

const octokit = new Octokit();
const storage = new Storage();

async function uploadStats(path) {
  await storage.bucket(bucket).upload(path, {
    gzip: true,
    public: true,
    destination: "stats.json",
    metadata: {
      cacheControl: 'public, max-age=86400',
      contentType: 'application/json'
    }
  });
}

exports.updateStats = (message, context) => {
  let totalStars = 0;
  let totalRepos = 0;

  octokit.repos.listForUser({
    "username": "mihirlad55",
    "type": "public"
  }).then(({data}) => {
    for (const repo of data) {
      totalStars += repo.stargazers_count;
      totalRepos++;
    }

    const stats = [
      {
        name: 'GitHub Stars',
        description: 'Number of stars given by others to my GitHub repositories',
        value: totalStars
      },
      {
        name: 'GitHub Projects',
        description: 'Total number of public GitHub repositories',
        value: totalRepos
      }
    ];

    const statsStr = JSON.stringify(stats);
    console.log(statsStr);

    fs.writeFileSync(tmpStatsPath, statsStr);
    console.log(`stats written to ${tmpStatsPath}`);

    uploadStats(tmpStatsPath).then(() => {
      console.log(`${tmpStatsPath} uploaded to ${bucket}`)
    });
  });
};

exports.getStats = (req, res) => {
  storage.bucket(bucket).file('stats.json').download((err, contents) => {
    // Allow cross-domain requests
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send(contents);
  });
};
