const { removeCommentById } = require("../models/model.comments.js");

exports.deleteCommentById = (req, res, next) => {
  const { comment_id: id } = req.params;

  removeCommentById(id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
