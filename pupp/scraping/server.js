const express = require("express");
const app = express();
const morgan = require("morgan");
const { scrapeGitRepoInfo } = require("./gitscrape.js");
const PORT = process.env.PORT || 9000;

app.use(morgan("dev"));

app.get("/repolist", async (req, res, next) => {
  const { user } = req.query
  try {
    const result = await scrapeGitRepoInfo(user, next);
    return res.status(200).send(JSON.stringify(result));
  } catch (err) {
    return next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500)
  return res.send({ msg: err.message });
});

app.listen(PORT, () => console.log(`server is running on ${PORT}`));