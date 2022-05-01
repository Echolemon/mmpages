/*
Medias Controller layer: responsible for business logic processing
with regard to media
*/

var dynamoDB = require("../dynamoDB.js");

module.exports = {
  fetchMedia: (req, res) => {
    const id = req.params.id;
    dynamoDB.fetchMediaById(id).then((response) => {
      if (response.result) {
        res.status(200).json({ message: response.msg });
      } else {
        res
          .status(500)
          .send("Internal error: Failed fetch Media with id: " + id);
      }
    });
  },
  fetchMedias: (req, res) => {
    dynamoDB.fetchAllMedias().then((response) => {
      if (response.result) {
        res.status(200).json({ message: response.msg });
      } else {
        res.status(500).send("internal error: Failed fetch all Medias");
      }
    });
  },
};
