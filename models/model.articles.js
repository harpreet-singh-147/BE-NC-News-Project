const db = require("../db/connection.js");

exports.fetchArticleById = (article_id) => {
  return db
    .query(
      `     SELECT articles.*, COUNT (comment_id) AS comment_count 
            FROM articles 
            LEFT JOIN comments 
            ON comments.article_id = articles.article_id
            WHERE articles.article_id = $1
            GROUP BY articles.article_id;`,
      [article_id]
    )
    .then(({ rows: [article] }) => {
      if (!article) {
        return Promise.reject({ status: 404, msg: "article not found" });
      } else {
        return article;
      }
    });
};

exports.modifyArticleById = (article_id, inc_votes) => {
  return db
    .query(
      ` UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,
      [inc_votes, article_id]
    )
    .then(({ rows: [article] }) => {
      if (!article) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      return article;
    });
};
