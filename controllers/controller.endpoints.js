const { readEndpoints } = require("../models/model.endpoints.js");

exports.getEndpoints = (req, res, next) => {
  readEndpoints()
    .then((endpoints) => {
      res.status(200).send({ endpoints });
    })
    .catch(next);
};
