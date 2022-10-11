const express = require("express");
const app = express();
const { getTopics } = require("./controllers/controller.topics.js");
const { getArticle } = require("./controllers/controller.articles.js");
const { getUsers } = require("./controllers/controller.users.js");

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticle);

app.get("/api/users", getUsers);

//JS errors
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

//PSQL errors
app.use((err, req, res, next) => {
  const pqslErrorCodes = ["22P02"];
  if (pqslErrorCodes.includes(err.code)) {
    res.status(400).send({ msg: "bad request" });
  } else {
    next(err);
  }
});

app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "page not found" });
});

app.use((err, req, res, next) => {
  console.log(err, "<<<<< error");
  res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
