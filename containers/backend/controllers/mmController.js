/*
Missing Mezzuzah Controller layer: responsible for business logic processing
with regard to Missing Mezzuzah
*/

var dynamoDB = require("../dynamoDB.js");

module.exports = {
  fetchAllMezzuzahStories: (req, res) => {
    dynamoDB.fetchAllMezzuzahStories().then((response) => {
      if (response.result) {
        res.status(200).json({ message: response.msg });
      } else {
        res.status(500).send("Internal error: Failed fetch all mezzuzot");
      }
    });
    //res.status(200).json({ message: 'Here is list of all flowers' });
  },
  fetchMezzuzahStory: (req, res) => {
    const id = req.params.id;
    dynamoDB.fetchMezzuzahStoryById(id).then((response) => {
      if (response.result) {
        res.status(200).json({ message: response.msg });
      } else {
        res
          .status(500)
          .send("Internal error: Failed fetch mezzuzah with id: " + id);
      }
    });
  },
};
