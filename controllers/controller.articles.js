const {
  fetchArticle,
  fetchArticleById,
  modifyArticleById,
  fetchCommentsByArticleId,
  insertCommentByArtcielId,
} = require("../models/model.articles.js");

exports.getArticle = (req, res, next) => {
  const { topic, sort_by, order } = req.query;
  fetchArticle(sort_by, topic, order)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.updateArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  modifyArticleById(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ updatedArticle: article });
    })
    .catch(next);
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
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  Promise.all([
    fetchArticleById(article_id),
    insertCommentByArtcielId(article_id, username, body),
  ])
    .then((promises) => {
      const comment = promises[1];
      res.status(201).send({ addedComment: comment });
    })
    .catch(next);
};
