//
// mezzuzahStory.js
//
// File containing the model for About

class About {
  constructor(json) {
    this.id = json.id;
    this.category = json.category;
    this.updatedAt = json.updatedAt;
    this.title = json.title;
    this.description = json.description;
    this.audios = json.audios == null ? [] : json.audios;
    this.videos = json.videos == null ? [] : json.videos;
    this.images = json.images == null ? [] : json.images;
  }

  static new(json) {
    json.id = json.category;
    json.updatedAt = new Date().getTime();
    return new About(json);
  }

  static update(json) {
    json.updatedAt = new Date().getTime();
    return new About(json);
  }

  toDynamoJSON() {
    return {
      id: this.id,
      category: this.category,
      updatedAt: this.updatedAt,
      title: this.title,
      description: this.description,
      audios: this.audios,
      videos: this.videos,
      images: this.images,
    };
  }
}

module.exports = About;
