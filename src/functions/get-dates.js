const {Octokit} = require('@octokit/rest');

const GITHUB_USERNAME = 'mihirlad55';
const GITHUB_AUTH_TOKEN = process.env.GITHUB_AUTH_TOKEN;

const octokit = new Octokit({
  auth: GITHUB_AUTH_TOKEN
});

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

async function getDates() {
  let {data} = await octokit.repos.listForUser({
    username: GITHUB_USERNAME,
    type: "public"
  });

  let jsons = [];

  for (const repo of data) {
    const json = {
      name: toTitleCase(repo.name.replace(/\-/g, " ")),
      id: repo.name,
      brief: repo.description,
      fullDescription: "",
      startDate: repo.created_at,
      endDate: repo.pushed_at,
      imageName: repo.name,
      languages: [],
      tags: [],
      git: {
        domain: "github",
        owner: "mihirlad55"
      }
    };
    jsons.push(json);
  }
  console.log(JSON.stringify(jsons));
}

getDates();
