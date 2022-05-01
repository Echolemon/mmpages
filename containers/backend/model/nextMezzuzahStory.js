//
// nextMezzuzahStory.js
//
// File containing the model for what's next of MezzuzahStory
//
const ROOT_URL = "http://localhost:3000";

//Used to generate unique Id for primary key e.g. id = uuidv4();
var { v4: uuidv4 } = require("uuid"); 

class NextMezzuzahStory {
  constructor(json) {
    this.id = json.id;
    this.prev_id = json.prev_id;
    this.briefDescription = json.briefDescription;
    this.detailedDescription = json.detailedDescription;
    this.familyName = json.familyName;
    this.familyMembers = json.familyMembers;
    this.address = json.address;
    this.audios = json.audios == null ? [] : json.audios;
    this.videos = json.videos == null ? [] : json.videos;
    this.images = json.images == null ? [] : json.images;
    this.link = json.link;
    this.updatedAt = json.updatedAt;
    this.createdAt = json.createdAt;
  }

  static new(json) {
    json.id = uuidv4();
    json.link = ROOT_URL + "/mm/" + json.id;
    json.createdAt = new Date().getTime();
    json.updatedAt = new Date().getTime();
    return new NextMezzuzahStory(json);
  }

  static update(json) {
    json.updatedAt = new Date().getTime();
    return new NextMezzuzahStory(json);
  }

  toDynamoJSON() {
    return {
      id: this.id,
      prev_id: this.prev_id,
      briefDescription: this.briefDescription,
      detailedDescription: this.detailedDescription,
      familyName: this.familyName,
      familyMembers: this.familyMembers,
      address: this.address,
      audios: this.audios,
      videos: this.videos,
      images: this.images,
      link: this.link,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    };
  }
}

module.exports = NextMezzuzahStory;
