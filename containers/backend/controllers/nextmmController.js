/*
What's Next of Missing Mezzuzah Controller layer: responsible for business logic processing
with regard to Next Missing Mezzuzah
*/

var dynamoDB = require("../dynamoDB.js");

module.exports = {
fetchNextMezzuzahStory: (req, res) => {
    const prev_id = req.params.prev_id;
    dynamoDB.fetchNextMezzuzahStoryByPrevId(prev_id).then((response) => {
      if (response.result) {
        res.status(200).json({ message: response.msg });
      } else {
        res
          .status(500)
          .send("Internal error: Failed fetch next mezzuzah with prev_id: " + prev_id);
      }
    });
  },
};