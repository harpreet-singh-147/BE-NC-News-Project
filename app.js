const express = require("express");
const app = express();
const { getTopics } = require("./controllers/controller.topics.js");
const {
  getArticle,
  getArticleById,
  updateArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("./controllers/controller.articles.js");
const { getUsers } = require("./controllers/controller.users.js");
const { deleteCommentById } = require("./controllers/controller.comments.js");
const { getEndpoints } = require("./controllers/controller.endpoints.js");

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/users", getUsers);

app.get("/api/articles", getArticle);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.post("/api/articles/:article_id/comments", postCommentByArticleId);
app.patch("/api/articles/:article_id", updateArticleById);
app.delete("/api/comments/:comment_id", deleteCommentById);

// JS errors
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

//PSQL errors
app.use((err, req, res, next) => {
  const pqslErrorCodes = ["22P02", "23502", "23503"];
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
