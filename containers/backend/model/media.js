//
// media.js
//
// File containing the model for Media
//
// Used to generate unique Id for primary key e.g. id = uuidv4();

var { v4: uuidv4 } = require("uuid");

class Media {
  constructor(json) {
    this.id = json.id;
    this.fileType = json.fileType;
    this.category = json.category;
    this.title = json.title;
    this.description = json.description;
    this.orderIndex = json.orderIndex;
    this.s3 = json.s3;
  }

  static new(json) {
    json.id = uuidv4();
    return new Media(json);
  }

  static update(json) {
    return new Media(json);
  }

  toDynamoJSON() {
    return {
      id: this.id,
      fileType: this.fileType,
      category: this.category,
      title: this.title,
      description: this.description,
      orderIndex: this.orderIndex,
      s3: this.s3,
    };
  }
}

module.exports = Media;
