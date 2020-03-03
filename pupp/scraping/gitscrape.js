const puppeteer = require("puppeteer");

async function scrapeGitRepoInfo(gitUser) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`https://www.github.com/${gitUser}?tab=repositories`);

  const repos = await page.evaluate(() => {
    const repoListContainer = document.getElementById("user-repositories-list");

    if (!repoListContainer) {
      throw new Error("Invalid Git Username")
    }

    const repoList = repoListContainer.children[0];

    if (!repoList.children.length) {
      throw new Error(`There no publicly listed repositories for user ${gitUser}`)
    }

    const repoArr = [];

    for (let i = 0; i < repoList.children.length; i++) {
      const title =
        repoList.children[i].children[0].children[0].children[0].children[0]
          .innerText;
      const description =
        repoList.children[i].children[0].children[1].innerText;

      // contains: language, stars/forks, updated on
      const infoBar = repoList.children[i].children[0].children[2];
      let lang =
        infoBar.children.length > 1
          ? infoBar.children[0].children[1].innerText
          : null;

      const updatedOn = infoBar.children[infoBar.children.length - 1].innerText;
      let stars =
        infoBar.children.length > 1 &&
        infoBar.children[1].children.length > 0 &&
        infoBar.children[1].children[0].classList.contains("octicon-star")
          ? infoBar.children[1].innerText
          : 0;
      repoArr.push({ title, description, lang, updatedOn, stars });
    }

    return repoArr;
  });

  browser.close();
  return repos;
}

module.exports = { scrapeGitRepoInfo };
