const express = require("express");
const app = express();
const controllers = require("./controllers/controller.topics.js");

app.use(express.json());

app.get("/api/topics", controllers.getTopics);

app.use((err, req, res, next) => {
  console.log(err, "<<<<< error");
  res.status(500).send({ msg: "Internal server error" });
});

app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "page not found" });
});

module.exports = app;
