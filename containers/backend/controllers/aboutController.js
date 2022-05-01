/*
About Controller layer: responsible for business logic processing
with regard to the About information (handles Glass Flowers, Missing Mezzuzot
and Estelle Rozinski home page)
*/

var dynamoDB = require("../dynamoDB.js");

module.exports = {
  fetchAbout: (req, res) => {
    const category = req.params.category;
    dynamoDB.fetchAboutById(category).then((response) => {
      if (response.result) {
        res.status(200).json({ message: response.msg });
      } else {
        res
          .status(500)
          .send("Internal error: Failed fetch About with id: " + id);
      }
    });
  },
};
