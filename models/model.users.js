const db = require("../db/connection.js");

exports.fetchUsers = () => {
  return db.query(`SELECT * FROM users`).then(({ rows: users }) => {
    return users;
  });
};
