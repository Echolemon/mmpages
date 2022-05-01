/*
Glass Flowers Controller layer: responsible for business logic processing
with regard to glass flowers
*/

var dynamoDB = require("../dynamoDB.js");

module.exports = {
  fetchFlower: (req, res) => {
    const id = req.params.id;
    dynamoDB.fetchFlowerStoryById(id).then((response) => {
      if (response.result) {
        res.status(200).json({ message: response.msg });
      } else {
        res
          .status(500)
          .send("Internal error: Failed fetch flower with id: " + id);
      }
    });
    //res.status(200).json({ message: 'Here is a single flower' });
  },

  fetchFlowers: (req, res) => {
    dynamoDB.fetchAllFlowerStories().then((response) => {
      if (response.result) {
        res.status(200).json({ message: response.msg });
      } else {
        res.status(500).send("Internal error: Failed fetch all flowers");
      }
    });
    //res.status(200).json({ message: 'Here is list of all flowers' });
  },

  fetchVideos: (req, res) => {
    dynamoDB.fetchAllVideosInFlowerStories().then((response) => {
      if (response.result) {
        var allVideos = [];
        response.msg.forEach((flowerStory) => {
          if (flowerStory.videos) {
            if (flowerStory.videos.length > 0) {
              flowerStory.videos.forEach((video) => {
                var videoEntry = {
                  flowerStoryId: flowerStory.id,
                  s3: video,
                };
                allVideos.push(videoEntry);
              });
            }
          }
        });
        res.status(200).json({ message: allVideos });
      } else {
        res.status(500).send("Internal error: Failed fetch all videos");
      }
    });
  },
};
