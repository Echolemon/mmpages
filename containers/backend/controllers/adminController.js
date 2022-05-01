/*
Admin Controller layer: responsible for business logic processing
with regard to admin platform
*/
var dynamoDB = require("../dynamoDB.js");
var qs = require("qs");

module.exports = {
  // ---------- Flower ----------
  addOrUpdateFlower: (req, res) => {
    const body = qs.parse(req.body);
    // console.log(body);
    const { id } = body;
    // console.log(id);

    var response;

    if (typeof id == "undefined") {
      // Flower story does not yet exist, need to add to FlowerStory table
      dynamoDB.addFlowerStory(body).then((response) => {
        if (response.result) {
          res.status(200).send(qs.stringify({ message: response.msg }));
          // console.log(response.msg);
        } else {
          res.status(500).send("Internal error: Failed to add flower");
        }
      });
    } else {
      // Flower story already exists, need to update existing entry in
      // FlowerStory table
      dynamoDB.updateFlowerStory(body).then((response) => {
        if (response.result) {
          res.status(200).send(qs.stringify({ message: response.msg }));
        } else {
          res
            .status(500)
            .send("Internal error: Failed to update flower with id=" + id);
        }
      });
    }
  },
  deleteFlower: (req, res) => {
    const { id } = qs.parse(req.body);
    dynamoDB.deleteFlowerStoryById(id).then((response) => {
      if (response.result) {
        res.status(200).send(qs.stringify({ message: response.msg }));
      } else {
        res
          .status(500)
          .send("Internal error: Failed to delete flower with id=" + id);
      }
    });
  },

  // ---------- Mezzuzah Story ----------
  addOrUpdateMezzuzahStory: (req, res) => {
    const body = qs.parse(req.body);
    const { id } = body;
    var response;

    if (!id) {
      dynamoDB.addMezzuzahStory(body).then((response) => {
        if (response.result) {
          res.status(200).send(qs.stringify({ message: response.msg }));
        } else {
          res.status(500).send("Internal error: Failed to add Mezzuzah story");
        }
      });
    } else {
      dynamoDB.updateMezzuzahStory(body).then((response) => {
        if (response.result) {
          res.status(200).send(qs.stringify({ message: response.msg }));
        } else {
          res
            .status(500)
            .send("Internal error: Failed to update Mezzuzah with id=" + id);
        }
      });
    }
  },

  deleteMezzuzahStory: (req, res) => {
    const { id } = qs.parse(req.body);
    dynamoDB.deleteMezzuzahStoryById(id).then((response) => {
      if (response.result) {
        res.status(200).send(qs.stringify({ message: response.msg }));
      } else {
        res
          .status(500)
          .send("Internal error: Failed to delete Mezzuzah with id=" + id);
      }
    });
  },

  // ---------- Next Mezzuzah Story ----------
  addOrUpdateNextMezzuzahStory: (req, res) => {
    const body = qs.parse(req.body);
    const { id } = body;
    var response;

    if (!id) {
      dynamoDB.addNextMezzuzahStory(body).then((response) => {
        if (response.result) {
          res.status(200).send(qs.stringify({ message: response.msg }));
        } else {
          res.status(500).send("Internal error: Failed to add Next Mezzuzah story");
        }
      });
    } else {
      dynamoDB.updateNextMezzuzahStory(body).then((response) => {
        if (response.result) {
          res.status(200).send(qs.stringify({ message: response.msg }));
        } else {
          res
            .status(500)
            .send("Internal error: Failed to update Next Mezzuzah with id=" + id);
        }
      });
    }
  },

  deleteNextMezzuzahStory: (req, res) => {
    const { id } = qs.parse(req.body);

    dynamoDB.deleteNextMezzuzahStoryById(id).then((response) => {
      if (response.result) {
        res.status(200).send(qs.stringify({ message: response.msg }));
      } else {
        res
          .status(500)
          .send("Internal error: Failed to delete Next Mezzuzah with id=" + id);
      }
    });
  },

  // ---------- Media ----------
  addOrUpdateMedia: (req, res) => {
    const body = qs.parse(req.body);
    const { id } = body;
    var response;

    if (!id) {
      // Media does not yet exist, need to add to Media table
      dynamoDB.addMedia(body).then((response) => {
        if (response.result) {
          res.status(200).send(qs.stringify({ message: response.msg }));
        } else {
          res.status(500).send("Internal error: Failed to add media");
        }
      });
    } else {
      // Media already exists, need to update existing entry in
      // Media table
      dynamoDB.updateMedia(body).then((response) => {
        if (response.result) {
          res.status(200).send(qs.stringify({ message: response.msg }));
        } else {
          res
            .status(500)
            .send("Internal error: Failed to update media with id=" + id);
        }
      });
    }
  },
  deleteMedia: (req, res) => {
    const { id } = qs.parse(req.body);
    dynamoDB.deleteMediaById(id).then((response) => {
      if (response.result) {
        res.status(200).send(qs.stringify({ message: response.msg }));
      } else {
        res
          .status(500)
          .send("Internal error: Failed to delete media with id=" + id);
      }
    });
  },

  addOrUpdateAboutInfo: (req, res) => {
    const body = qs.parse(req.body);
    const { id } = body;
    var response;

    if (!id) {
      // About information does not yet exist, need to add to About table
      dynamoDB.addAbout(body).then((response) => {
        if (response.result) {
          res.status(200).send(qs.stringify({ message: response.msg }));
        } else {
          res
            .status(500)
            .send("Internal error: Failed to add About information");
        }
      });
    } else {
      // About information already exists, need to update existing entry in
      // About table
      dynamoDB.updateAbout(body).then((response) => {
        if (response.result) {
          res.status(200).send(qs.stringify({ message: response.msg }));
        } else {
          res
            .status(500)
            .send(
              "Internal error: Failed to update About information for" + id
            );
        }
      });
    }
  },

  deleteAboutInfo: (req, res) => {
    const { id } = qs.parse(req.body);
    dynamoDB.deleteAboutById(id).then((response) => {
      if (response.result) {
        res.status(200).send(qs.stringify({ message: response.msg }));
      } else {
        res
          .status(500)
          .send(
            "Internal error: Failed to delete About Information with id=" + id
          );
      }
    });
  },
};
