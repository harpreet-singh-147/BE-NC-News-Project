const {
  fetchArticle,
  fetchArticleById,
  modifyArticleById,
  fetchCommentsByArticleId,
} = require("../models/model.articles.js");

exports.getArticle = (req, res, next) => {
  const { topic, sort_by } = req.query;
  fetchArticle(sort_by, topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};
exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  modifyArticleById(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ updatedArticle: article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  Promise.all([
    fetchArticleById(article_id),
    fetchCommentsByArticleId(article_id),
  ])
    .then((promises) => {
      comments = promises[1];
      res.status(200).send({ articleComments: comments });
    })
    .catch((err) => {
      next(err);
    });
};
