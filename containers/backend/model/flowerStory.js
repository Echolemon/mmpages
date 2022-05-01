//
// flowerStory.js
//
// File containing the model for FlowerStory
//
const ROOT_URL = "http://localhost:3000";

// Used to generate unique Id for primary key e.g. id = uuidv4();
var { v4: uuidv4 } = require("uuid"); 

class FlowerStory {
  constructor(json) {
    this.id = json.id;
    this.briefDescription = json.briefDescription;
    this.detailedDescription = json.detailedDescription;
    this.familyName = json.familyName;
    this.familyMembers = json.familyMembers;
    this.address = json.address;
    this.flowerType = json.flowerType;
    this.audios = json.audios == null ? [] : json.audios;
    this.videos = json.videos == null ? [] : json.videos;
    this.images = json.images == null ? [] : json.images;
    this.link = json.link;
    this.updatedAt = json.updatedAt;
    this.createdAt = json.createdAt;
  }

  updateId(new_id) {
    this.id = new_id;
  }

  static new(json) {
    json.id = uuidv4();
    json.link = ROOT_URL + "/flowerStory/" + json.id;
    json.createdAt = new Date().getTime();
    json.updatedAt = new Date().getTime();
    return new FlowerStory(json);
  }

  static update(json) {
    json.updatedAt = new Date().getTime();
    return new FlowerStory(json);
  }

  toDynamoJSON() {
    return {
      id: this.id,
      briefDescription: this.briefDescription,
      detailedDescription: this.detailedDescription,
      familyName: this.familyName,
      familyMembers: this.familyMembers,
      address: this.address,
      flowerName: this.flowerName,
      flowerType: this.flowerType,
      audios: this.audios,
      videos: this.videos,
      images: this.images,
      link: this.link,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    };
  }
}

module.exports = FlowerStory;
