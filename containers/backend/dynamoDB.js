/*
*   dynamoDB.js is responsible for defining dynamoDB related features
*/

var FlowerStory = require("./model/flowerStory.js");
var MezzuzahStory = require("./model/mezzuzahStory.js");
var NextMezzuzahStory = require("./model/nextMezzuzahStory.js");
var About = require("./model/about.js");
var Media = require("./model/media");
var AWS = require("aws-sdk");

const SUCCESSFULMSG = "Successful";

///// DB Table Names /////////
const FLOWERSTORY = "FlowerStory";
const MEZZUZAHSTORY = "MezzuzahStory";
const NEXTMEZZUZAHSTORY = "NextMezzuzahStory"
const ABOUT = "About";
const MEDIA = "Media";

//// AWS access key configuration /////
AWS.config.update({
  region: "us-east-1",
  accessKeyId: "AKIAU5VANDLK3VFMLE5Z",
  secretAccessKey: "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",
});
var docClient = new AWS.DynamoDB.DocumentClient();

//////////////Flower Story////////////
function addFlowerStory(json) {
  var flowerStory = FlowerStory.new(json);
  var params = {
    TableName: FLOWERSTORY,
    Item: flowerStory.toDynamoJSON(),
  };
  return new Promise(function (resolve, reject) {
    docClient.put(params, function (err, data) {
      if (err) {
        reject({ result: false, msg: err });
      } else {
        resolve({ result: true, msg: params.Item });
      }
    });
  });
}

function fetchFlowerStoryById(id) {
  var params = {
    TableName: FLOWERSTORY,
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeNames: {
      "#id": "id",
    },
    ExpressionAttributeValues: {
      ":id": id,
    },
  };

  return new Promise(function (resolve, reject) {
    docClient.query(params, function (err, data) {
      if (err) {
        reject({ result: false, msg: err });
      } else {
        resolve({ result: true, msg: data.Items[0] });
      }
    });
  });
}

async function fetchAllFlowerStories() {
  var params = {
    TableName: FLOWERSTORY,
    ProjectionExpression:
      "id, briefDescription, detailedDescription, familyName, familyMembers, address, flowerType, audios, videos, images, link, updatedAt, createdAt",
  };

  const scanResults = [];
  var items;
  do {
    items = await docClient.scan(params).promise();
    items.Items.forEach((item) => scanResults.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey !== "undefined");

  return { result: true, msg: scanResults };
}

async function fetchAllVideosInFlowerStories() {
  var params = {
    TableName: FLOWERSTORY,
    ProjectionExpression: "id, videos",
  };

  const scanResults = [];
  var items;
  do {
    items = await docClient.scan(params).promise();
    items.Items.forEach((item) => scanResults.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey !== "undefined");

  return { result: true, msg: scanResults };
}

function deleteFlowerStoryById(id) {
  var params = {
    TableName: FLOWERSTORY,
    Key: {
      id: id,
    },
  };
  return new Promise(function (resolve, reject) {
    docClient.delete(params, function (err, data) {
      if (err) {
        reject({ result: false, msg: err });
      } else {
        resolve({ result: true, msg: SUCCESSFULMSG });
      }
    });
  });
}

function updateFlowerStory(json) {
  var flowerStory = FlowerStory.update(json);
  var params = {
    TableName: FLOWERSTORY,
    Key: {
      id: flowerStory.id,
    },
    UpdateExpression:
      "set briefDescription = :bd, detailedDescription = :dd, familyName = :f, familyMembers = :fm, address = :ad, flowerType = :ft, audios = :a, videos = :v, images = :i, link = :l, updatedAt = :ua",
    ConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": flowerStory.id,
      ":bd": flowerStory.briefDescription,
      ":dd": flowerStory.detailedDescription,
      ":f": flowerStory.familyName,
      ":fm": flowerStory.familyMembers,
      ":ad": flowerStory.address,
      ":ft": flowerStory.flowerType,
      ":a": flowerStory.audios,
      ":v": flowerStory.videos,
      ":i": flowerStory.images,
      ":l": flowerStory.link,
      ":ua": flowerStory.updatedAt,
    },
    ReturnValues: "UPDATED_NEW",
  };

  return new Promise(function (resolve, reject) {
    docClient.update(params, function (err, data) {
      if (err) {
        reject({ result: false, msg: err });
      } else {
        resolve({ result: true, msg: data.Attributes });
      }
    });
  });
}

//////////////Mezzuzah Story////////////
function addMezzuzahStory(json) {
  var mezzuzahStory = MezzuzahStory.new(json);
  var params = {
    TableName: MEZZUZAHSTORY,
    Item: mezzuzahStory.toDynamoJSON(),
  };
  return new Promise(function (resolve, reject) {
    docClient.put(params, function (err, data) {
      if (err) {
        reject({ result: false, msg: err });
      } else {
        resolve({ result: true, msg: params.Item });
      }
    });
  });
}

function fetchMezzuzahStoryById(id) {
  var params = {
    TableName: MEZZUZAHSTORY,
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeNames: {
      "#id": "id",
    },
    ExpressionAttributeValues: {
      ":id": id,
    },
  };

  return new Promise(function (resolve, reject) {
    docClient.query(params, function (err, data) {
      if (err) {
        reject({ result: false, msg: err });
      } else {
        resolve({ result: true, msg: data.Items[0] });
      }
    });
  });
}

async function fetchAllMezzuzahStories() {
  var params = {
    TableName: MEZZUZAHSTORY,
    ProjectionExpression:
      "id, briefDescription, detailedDescription, familyName, familyMembers, address, audios, videos, images, link, updatedAt, createdAt",
  };

  const scanResults = [];
  var items;
  do {
    items = await docClient.scan(params).promise();
    items.Items.forEach((item) => scanResults.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey !== "undefined");

  return { result: true, msg: scanResults };
}

function deleteMezzuzahStoryById(id) {
  var params = {
    TableName: MEZZUZAHSTORY,
    Key: {
      id: id,
    },
  };
  return new Promise(function (resolve, reject) {
    docClient.delete(params, function (err, data) {
      if (err) {
        reject({ result: false, msg: err });
      } else {
        resolve({ result: true, msg: SUCCESSFULMSG });
      }
    });
  });
}

function updateMezzuzahStory(json) {
  var mezzuzahStory = MezzuzahStory.update(json);
  var params = {
    TableName: MEZZUZAHSTORY,
    Key: {
      id: mezzuzahStory.id,
    },
    UpdateExpression:
      "set briefDescription = :bd, detailedDescription = :dd, familyName = :f, familyMembers = :fm, address = :ad, audios = :a, videos = :v, images = :i, link = :l, updatedAt = :ua",
    ConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": mezzuzahStory.id,
      ":bd": mezzuzahStory.briefDescription,
      ":dd": mezzuzahStory.detailedDescription,
      ":f": mezzuzahStory.familyName,
      ":fm": mezzuzahStory.familyMembers,
      ":ad": mezzuzahStory.address,
      ":a": mezzuzahStory.audios,
      ":v": mezzuzahStory.videos,
      ":i": mezzuzahStory.images,
      ":l": mezzuzahStory.link,
      ":ua": mezzuzahStory.updatedAt,
    },
    ReturnValues: "UPDATED_NEW",
  };

  return new Promise(function (resolve, reject) {
    docClient.update(params, function (err, data) {
      if (err) {
        reject({ result: false, msg: err });
      } else {
        resolve({ result: true, msg: data.Attributes });
      }
    });
  });
}

//////////////Next Mezzuzah Story////////////
function addNextMezzuzahStory(json) {
  var nextMezzuzahStory = NextMezzuzahStory.new(json);
  var params = {
    TableName: NEXTMEZZUZAHSTORY,
    Item: nextMezzuzahStory.toDynamoJSON(),
  };
  return new Promise(function (resolve, reject) {
    docClient.put(params, function (err, data) {
      if (err) {
        reject({ result: false, msg: err });
      } else {
        resolve({ result: true, msg: params.Item });
      }
    });
  });
}

function fetchNextMezzuzahStoryByPrevId(prev_id) {
  var params = {
    FilterExpression: "prev_id = :pid",
    ExpressionAttributeValues: {":pid": prev_id},
    TableName: NEXTMEZZUZAHSTORY,
  };

  return new Promise(function (resolve, reject) {
    docClient.scan(params, function (err, data) {
      if (err) {
        reject({ result: false, msg: err });
      } else {
        resolve({ result: true, msg: data });
      }
    });
  });
}

function deleteNextMezzuzahStoryById(id) {
  var params = {
    TableName: NEXTMEZZUZAHSTORY,
    Key: {
      id: id,
    },
  };
  return new Promise(function (resolve, reject) {
    docClient.delete(params, function (err, data) {
      if (err) {
        reject({ result: false, msg: err });
      } else {
        resolve({ result: true, msg: SUCCESSFULMSG });
      }
    });
  });
}

function updateNextMezzuzahStory(json) {
  var nextMezzuzahStory = NextMezzuzahStory.update(json);
  var params = {
    TableName: NEXTMEZZUZAHSTORY,
    Key: {
      id: nextMezzuzahStory.id,
    },
    UpdateExpression:
      "set prev_id = :prev_id, briefDescription = :bd, detailedDescription = :dd, familyName = :f, familyMembers = :fm, address = :ad, audios = :a, videos = :v, images = :i, link = :l, updatedAt = :ua",
    ConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": nextMezzuzahStory.id,
      ":prev_id": nextMezzuzahStory.prev_id,
      ":bd": nextMezzuzahStory.briefDescription,
      ":dd": nextMezzuzahStory.detailedDescription,
      ":f": nextMezzuzahStory.familyName,
      ":fm": nextMezzuzahStory.familyMembers,
      ":ad": nextMezzuzahStory.address,
      ":a": nextMezzuzahStory.audios,
      ":v": nextMezzuzahStory.videos,
      ":i": nextMezzuzahStory.images,
      ":l": nextMezzuzahStory.link,
      ":ua": nextMezzuzahStory.updatedAt,
    },
    ReturnValues: "UPDATED_NEW",
  };

  return new Promise(function (resolve, reject) {
    docClient.update(params, function (err, data) {
      if (err) {
        reject({ result: false, msg: err });
      } else {
        resolve({ result: true, msg: data.Attributes });
      }
    });
  });
}


//////////////About////////////
function addAbout(json) {
  var about = About.new(json);
  var params = {
    TableName: ABOUT,
    Item: about.toDynamoJSON(),
  };
  return new Promise(function (resolve, reject) {
    docClient.put(params, function (err, data) {
      if (err) {
        reject({ result: false, msg: err });
      } else {
        resolve({ result: true, msg: params.Item });
      }
    });
  });
}

function fetchAboutById(id) {
  var params = {
    TableName: ABOUT,
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeNames: {
      "#id": "id",
    },
    ExpressionAttributeValues: {
      ":id": id,
    },
  };

  return new Promise(function (resolve, reject) {
    docClient.query(params, function (err, data) {
      if (err) {
        reject({ result: false, msg: err });
      } else {
        resolve({ result: true, msg: data.Items[0] });
      }
    });
  });
}

async function fetchAllAbouts() {
  var params = {
    TableName: ABOUT,
    ProjectionExpression:
      "id, category, title, description, audios, videos, images",
  };

  const scanResults = [];
  var items;
  do {
    items = await docClient.scan(params).promise();
    items.Items.forEach((item) => scanResults.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey !== "undefined");

  return { result: true, msg: scanResults };
}

function deleteAboutById(id) {
  var params = {
    TableName: ABOUT,
    Key: {
      id: id,
    },
  };
  return new Promise(function (resolve, reject) {
    docClient.delete(params, function (err, data) {
      if (err) {
        reject({ result: false, msg: err });
      } else {
        resolve({ result: true, msg: SUCCESSFULMSG });
      }
    });
  });
}

function updateAbout(json) {
  var about = About.update(json);
  var params = {
    TableName: ABOUT,
    Key: {
      id: about.id,
    },
    UpdateExpression:
      "set category = :c, title = :t, description = :d, audios = :a, videos = :v, images = :i, updatedAt = :ua",
    ConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": about.id,
      ":c": about.category,
      ":t": about.title,
      ":d": about.description,
      ":a": about.audios,
      ":v": about.videos,
      ":i": about.images,
      ":ua": about.updatedAt,
    },
    ReturnValues: "UPDATED_NEW",
  };

  return new Promise(function (resolve, reject) {
    docClient.update(params, function (err, data) {
      if (err) {
        reject({ result: false, msg: err });
      } else {
        resolve({ result: true, msg: data.Attributes });
      }
    });
  });
}

//////////////Media////////////
function addMedia(json) {
  var media = Media.new(json);
  var params = {
    TableName: MEDIA,
    Item: media.toDynamoJSON(),
  };
  return new Promise(function (resolve, reject) {
    docClient.put(params, function (err, data) {
      if (err) {
        reject({ result: false, msg: err });
      } else {
        resolve({ result: true, msg: params.Item });
      }
    });
  });
}

function fetchMediaById(id) {
  var params = {
    TableName: MEDIA,
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeNames: {
      "#id": "id",
    },
    ExpressionAttributeValues: {
      ":id": id,
    },
  };

  return new Promise(function (resolve, reject) {
    docClient.query(params, function (err, data) {
      if (err) {
        reject({ result: false, msg: err });
      } else {
        resolve({ result: true, msg: data.Items[0] });
      }
    });
  });
}

async function fetchAllMedias() {
  var params = {
    TableName: MEDIA,
    ProjectionExpression:
      "id, fileType, category, title, description, orderIndex, s3",
  };

  const scanResults = [];
  var items;
  do {
    items = await docClient.scan(params).promise();
    items.Items.forEach((item) => scanResults.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey !== "undefined");

  return { result: true, msg: scanResults };
}

function deleteMediaById(id) {
  var params = {
    TableName: MEDIA,
    Key: {
      id: id,
    },
  };
  return new Promise(function (resolve, reject) {
    docClient.delete(params, function (err, data) {
      if (err) {
        reject({ result: false, msg: err });
      } else {
        resolve({ result: true, msg: SUCCESSFULMSG });
      }
    });
  });
}

function updateMedia(json) {
  var media = Media.update(json);
  var params = {
    TableName: MEDIA,
    Key: {
      id: media.id,
    },
    UpdateExpression:
      "set fileType = :f, category = :ct, title = :t, description = :des, orderIndex =:o, s3 = :s",
    ConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": media.id,
      ":f": media.fileType,
      ":ct": media.category,
      ":t": media.title,
      ":des": media.description,
      ":o": media.orderIndex,
      ":s": media.s3,
    },
    ReturnValues: "UPDATED_NEW",
  };

  return new Promise(function (resolve, reject) {
    docClient.update(params, function (err, data) {
      if (err) {
        reject({ result: false, msg: err });
      } else {
        resolve({ result: true, msg: data.Attributes });
      }
    });
  });
}

module.exports.addFlowerStory = addFlowerStory;
module.exports.fetchFlowerStoryById = fetchFlowerStoryById;
module.exports.fetchAllFlowerStories = fetchAllFlowerStories;
module.exports.fetchAllVideosInFlowerStories = fetchAllVideosInFlowerStories;
module.exports.deleteFlowerStoryById = deleteFlowerStoryById;
module.exports.updateFlowerStory = updateFlowerStory;

module.exports.addMezzuzahStory = addMezzuzahStory;
module.exports.fetchMezzuzahStoryById = fetchMezzuzahStoryById;
module.exports.fetchAllMezzuzahStories = fetchAllMezzuzahStories;
module.exports.deleteMezzuzahStoryById = deleteMezzuzahStoryById;
module.exports.updateMezzuzahStory = updateMezzuzahStory;

module.exports.addNextMezzuzahStory = addNextMezzuzahStory;
module.exports.fetchNextMezzuzahStoryByPrevId = fetchNextMezzuzahStoryByPrevId;
module.exports.deleteNextMezzuzahStoryById = deleteNextMezzuzahStoryById;
module.exports.updateNextMezzuzahStory = updateNextMezzuzahStory;

module.exports.addAbout = addAbout;
module.exports.fetchAboutById = fetchAboutById;
module.exports.fetchAllAbouts = fetchAllAbouts;
module.exports.deleteAboutById = deleteAboutById;
module.exports.updateAbout = updateAbout;

module.exports.addMedia = addMedia;
module.exports.fetchMediaById = fetchMediaById;
module.exports.fetchAllMedias = fetchAllMedias;
module.exports.deleteMediaById = deleteMediaById;
module.exports.updateMedia = updateMedia;
