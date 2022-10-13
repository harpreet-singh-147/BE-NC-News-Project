const db = require("../db/connection.js");

exports.fetchArticle = (sort_by = "created_at", topic) => {
  const validColumns = [
    "article_id",
    "author",
    "title",
    "topic",
    "created_at",
    "votes",
  ];
  const validTopics = ["cats", "paper", "mitch"];
  if (topic && !validTopics.includes(topic)) {
    return Promise.reject({ status: 404, msg: `no ${topic} found` });
  }

  if (!validColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }

  let queryStr = `
        SELECT  
        articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes,
        COUNT (comment_id)::INT AS comment_count
        FROM articles
        LEFT JOIN comments
        ON articles.article_id = comments.article_id`;

  const queryValues = [];

  if (topic) {
    queryStr += ` WHERE topic = $1`;
    queryValues.push(topic);
  }

  queryStr += ` GROUP BY articles.article_id ORDER BY ${sort_by} DESC;`;
  return db.query(queryStr, queryValues).then(({ rows: articles }) => {
    return articles;
  });
};

exports.fetchArticleById = (article_id) => {
  return db
    .query(
      `     SELECT articles.*, COUNT (comment_id)::INT AS comment_count 
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
        return Promise.reject({ status: 404, msg: "article not found" });
      }
      return article;
    });
};

exports.fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      `   SELECT comment_id, votes, created_at, author, body
          FROM comments
          WHERE comments.article_id = $1
          ORDER BY created_at DESC;`,
      [article_id]
    )
    .then(({ rows: comments }) => {
      return comments;
    });
};
