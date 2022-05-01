/*
 *   Test file for dynamoDB. Responsible for testing all dynamoDB-related
 *   functions 
 */

var dynamoDB = require("../dynamoDB.js");

const SUCCESSFULMSG = "Successful";

describe("dynamoDB Flower Story", () => {
  var id;

  test("addFlowerStory", async (done) => {
    data = {
      briefDescription: "test brief description",
      detailedDescription: "test detailed description",
      familyName: "test familyName",
      familyMembers: "test familyMembers",
      address: "test address",
      flowerType: "test flowerType",
      audios: [
        {
          key: "audiokey1",
          bucket: "mezzuzot media",
          caption: "test caption",
          location: "www.s3.com/audiokey1",
        },
      ],
      videos: [
        {
          key: "videokey1",
          bucket: "mezzuzot media",
          caption: "test caption",
          location: "www.s3.com/videokey1",
        },
      ],
      images: [
        {
          key: "imagekey1",
          bucket: "mezzuzot media",
          caption: "someone play soccer",
          location: "www.s3.com/imagekey1",
        },
        {
          key: "imagekey2",
          bucket: "test bucket",
          caption: "test caption",
          location: "test location",
        },
      ],
      link: "test link",
    };

    var res = await dynamoDB.addFlowerStory(data);
    id = res.msg.id;
    expect(res.result).toBe(true);
    done();
  });

  test("fetchFlowerStoryById", async (done) => {
    var res = await dynamoDB.fetchFlowerStoryById(id);
    expect(res.result).toBe(true);
    expect(res.msg.id).toBe(id);
    expect(res.msg.briefDescription).toBe("test brief description");
    expect(res.msg.detailedDescription).toBe("test detailed description");
    expect(res.msg.familyName).toBe("test familyName");
    expect(res.msg.familyMembers).toBe("test familyMembers");
    expect(res.msg.address).toBe("test address");
    expect(res.msg.flowerType).toBe("test flowerType");
    expect(res.msg.audios).toStrictEqual([
      {
        key: "audiokey1",
        bucket: "mezzuzot media",
        caption: "test caption",
        location: "www.s3.com/audiokey1",
      },
    ]);
    expect(res.msg.videos).toStrictEqual([
      {
        key: "videokey1",
        bucket: "mezzuzot media",
        caption: "test caption",
        location: "www.s3.com/videokey1",
      },
    ]);
    expect(res.msg.images).toStrictEqual([
      {
        key: "imagekey1",
        bucket: "mezzuzot media",
        caption: "someone play soccer",
        location: "www.s3.com/imagekey1",
      },
      {
        key: "imagekey2",
        bucket: "test bucket",
        caption: "test caption",
        location: "test location",
      },
    ]);
    expect(res.msg).toHaveProperty("id");
    expect(res.msg).toHaveProperty("link");
    done();
  });

  test("fetchAllFlowerStories", async (done) => {
    var res = await dynamoDB.fetchAllFlowerStories();
    expect(res.result).toBe(true);
    expect(res.msg.length).toBeGreaterThan(0);
    done();
  });

  test("fetchAllVideosInFlowerStories", async (done) => {
    var res = await dynamoDB.fetchAllVideosInFlowerStories();
    expect(res.result).toBe(true);
    expect(res.msg.length).toBeGreaterThan(0);
    done();
  });

  test("updateFlowerStory", async (done) => {
    data = {
      id: id,
      briefDescription: "updated brief description",
      detailedDescription: "test detailed description",
      familyName: "test familyName",
      familyMembers: "test familyMembers",
      address: "test address",
      flowerType: "test flowerType",
      audios: [
        {
          key: "audiokey1",
          bucket: "mezzuzot media",
          caption: "test caption",
          location: "www.s3.com/audiokey1",
        },
      ],
      videos: [
        {
          key: "videokey1",
          bucket: "mezzuzot media",
          caption: "test caption",
          location: "www.s3.com/videokey1",
        },
      ],
      images: [
        {
          key: "imagekey1",
          bucket: "mezzuzot media",
          caption: "someone play soccer",
          location: "www.s3.com/imagekey1",
        },
        {
          key: "imagekey2",
          bucket: "test bucket",
          caption: "test caption",
          location: "test location",
        },
      ],
      link: "test link",
    };
    var res = await dynamoDB.updateFlowerStory(data);
    expect(res.result).toBe(true);
    expect(res.msg.briefDescription).toBe("updated brief description");
    expect(res.msg.detailedDescription).toBe("test detailed description");
    expect(res.msg.familyName).toBe("test familyName");
    expect(res.msg.familyMembers).toBe("test familyMembers");
    expect(res.msg.address).toBe("test address");
    expect(res.msg.flowerType).toBe("test flowerType");
    expect(res.msg.audios).toStrictEqual([
      {
        key: "audiokey1",
        bucket: "mezzuzot media",
        caption: "test caption",
        location: "www.s3.com/audiokey1",
      },
    ]);
    expect(res.msg.videos).toStrictEqual([
      {
        key: "videokey1",
        bucket: "mezzuzot media",
        caption: "test caption",
        location: "www.s3.com/videokey1",
      },
    ]);
    expect(res.msg.images).toStrictEqual([
      {
        key: "imagekey1",
        bucket: "mezzuzot media",
        caption: "someone play soccer",
        location: "www.s3.com/imagekey1",
      },
      {
        key: "imagekey2",
        bucket: "test bucket",
        caption: "test caption",
        location: "test location",
      },
    ]);
    expect(res.msg.link).toBe("test link");
    done();
  });

  test("deleteFlowerStoryById", async (done) => {
    var res = await dynamoDB.deleteFlowerStoryById(id);
    expect(res.result).toBe(true);
    expect(res.msg).toBe(SUCCESSFULMSG);
    done();
  });
});

describe("dynamoDB Mezzuzah Story", () => {
  var id;

  test("addMezzuzahStory", async (done) => {
    data = {
      briefDescription: "test brief description",
      detailedDescription: "test detailed description",
      familyName: "test familyName",
      familyMembers: "test familyMembers",
      address: "test address",
      audios: [
        {
          key: "audiokey1",
          bucket: "mezzuzot media",
          caption: "test caption",
          location: "www.s3.com/audiokey1",
        },
      ],
      videos: [
        {
          key: "videokey1",
          bucket: "mezzuzot media",
          caption: "test caption",
          location: "www.s3.com/videokey1",
        },
      ],
      images: [
        {
          key: "imagekey1",
          bucket: "mezzuzot media",
          caption: "someone play soccer",
          location: "www.s3.com/imagekey1",
        },
        {
          key: "imagekey2",
          bucket: "test bucket",
          caption: "test caption",
          location: "test location",
        },
      ],
      link: "test link",
    };

    var res = await dynamoDB.addMezzuzahStory(data);
    id = res.msg.id;
    expect(res.result).toBe(true);
    done();
  });

  test("fetchMezzuzahStoryById", async (done) => {
    var res = await dynamoDB.fetchMezzuzahStoryById(id);
    expect(res.result).toBe(true);
    expect(res.msg.id).toBe(id);
    expect(res.msg.briefDescription).toBe("test brief description");
    expect(res.msg.detailedDescription).toBe("test detailed description");
    expect(res.msg.familyName).toBe("test familyName");
    expect(res.msg.familyMembers).toBe("test familyMembers");
    expect(res.msg.address).toBe("test address");
    expect(res.msg.audios).toStrictEqual([
      {
        key: "audiokey1",
        bucket: "mezzuzot media",
        caption: "test caption",
        location: "www.s3.com/audiokey1",
      },
    ]);
    expect(res.msg.videos).toStrictEqual([
      {
        key: "videokey1",
        bucket: "mezzuzot media",
        caption: "test caption",
        location: "www.s3.com/videokey1",
      },
    ]);
    expect(res.msg.images).toStrictEqual([
      {
        key: "imagekey1",
        bucket: "mezzuzot media",
        caption: "someone play soccer",
        location: "www.s3.com/imagekey1",
      },
      {
        key: "imagekey2",
        bucket: "test bucket",
        caption: "test caption",
        location: "test location",
      },
    ]);
    // expect(res.msg.link).toBe("test link");
    done();
  });

  test("fetchAllMezzuzahStories", async (done) => {
    var res = await dynamoDB.fetchAllMezzuzahStories();
    expect(res.result).toBe(true);
    expect(res.msg.length).toBeGreaterThan(0);
    done();
  });

  test("updateMezzuzahStory", async (done) => {
    data = {
      id: id,
      briefDescription: "updated brief description",
      detailedDescription: "test detailed description",
      familyName: "test familyName",
      familyMembers: "test familyMembers",
      address: "test address",
      audios: [
        {
          key: "audiokey1",
          bucket: "mezzuzot media",
          caption: "test caption",
          location: "www.s3.com/audiokey1",
        },
      ],
      videos: [
        {
          key: "videokey1",
          bucket: "mezzuzot media",
          caption: "test caption",
          location: "www.s3.com/videokey1",
        },
      ],
      images: [
        {
          key: "imagekey1",
          bucket: "mezzuzot media",
          caption: "someone play soccer",
          location: "www.s3.com/imagekey1",
        },
        {
          key: "imagekey2",
          bucket: "test bucket",
          caption: "test caption",
          location: "test location",
        },
      ],
      link: "test link",
    };
    var res = await dynamoDB.updateMezzuzahStory(data);
    expect(res.result).toBe(true);
    expect(res.msg.briefDescription).toBe("updated brief description");
    expect(res.msg.detailedDescription).toBe("test detailed description");
    expect(res.msg.familyName).toBe("test familyName");
    expect(res.msg.familyMembers).toBe("test familyMembers");
    expect(res.msg.address).toBe("test address");
    expect(res.msg.audios).toStrictEqual([
      {
        key: "audiokey1",
        bucket: "mezzuzot media",
        caption: "test caption",
        location: "www.s3.com/audiokey1",
      },
    ]);
    expect(res.msg.videos).toStrictEqual([
      {
        key: "videokey1",
        bucket: "mezzuzot media",
        caption: "test caption",
        location: "www.s3.com/videokey1",
      },
    ]);
    expect(res.msg.images).toStrictEqual([
      {
        key: "imagekey1",
        bucket: "mezzuzot media",
        caption: "someone play soccer",
        location: "www.s3.com/imagekey1",
      },
      {
        key: "imagekey2",
        bucket: "test bucket",
        caption: "test caption",
        location: "test location",
      },
    ]);
    expect(res.msg.link).toBe("test link");
    done();
  });

  test("deleteMezzuzahStoryById", async (done) => {
    var res = await dynamoDB.deleteMezzuzahStoryById(id);
    expect(res.result).toBe(true);
    expect(res.msg).toBe(SUCCESSFULMSG);
    done();
  });
});

describe("dynamoDB About", () => {
  var id;

  test("addAbout", async (done) => {
    data = {
      category: "flowerTEST",
      title: "test title",
      description: "test description",
      audios: [
        {
          key: "audiokey1",
          bucket: "mezzuzot media",
          caption: "test caption",
          location: "www.s3.com/audiokey1",
        },
      ],
      videos: [
        {
          key: "videokey1",
          bucket: "mezzuzot media",
          caption: "test caption",
          location: "www.s3.com/videokey1",
        },
      ],
      images: [
        {
          key: "imagekey1",
          bucket: "mezzuzot media",
          caption: "someone play soccer",
          location: "www.s3.com/imagekey1",
        },
        {
          key: "imagekey2",
          bucket: "test bucket",
          caption: "test caption",
          location: "test location",
        },
      ],
    };

    var res = await dynamoDB.addAbout(data);
    id = res.msg.id;
    expect(res.result).toBe(true);
    done();
  });

  test("fetchAboutById", async (done) => {
    var res = await dynamoDB.fetchAboutById(id);
    expect(res.result).toBe(true);
    expect(res.msg.id).toBe(id);
    expect(res.msg.category).toBe("flowerTEST");
    expect(res.msg.title).toBe("test title");
    expect(res.msg.description).toBe("test description");
    expect(res.msg.audios).toStrictEqual([
      {
        key: "audiokey1",
        bucket: "mezzuzot media",
        caption: "test caption",
        location: "www.s3.com/audiokey1",
      },
    ]);
    expect(res.msg.videos).toStrictEqual([
      {
        key: "videokey1",
        bucket: "mezzuzot media",
        caption: "test caption",
        location: "www.s3.com/videokey1",
      },
    ]);
    expect(res.msg.images).toStrictEqual([
      {
        key: "imagekey1",
        bucket: "mezzuzot media",
        caption: "someone play soccer",
        location: "www.s3.com/imagekey1",
      },
      {
        key: "imagekey2",
        bucket: "test bucket",
        caption: "test caption",
        location: "test location",
      },
    ]);
    done();
  });

  test("fetchAllAbouts", async (done) => {
    var res = await dynamoDB.fetchAllAbouts();
    expect(res.result).toBe(true);
    expect(res.msg.length).toBeGreaterThan(0);
    done();
  });

  test("updateAbout", async (done) => {
    data = {
      id: id,
      category: "flowerTEST",
      title: "test title",
      description: "updated test description",
      audios: [
        {
          key: "audiokey1",
          bucket: "mezzuzot media",
          caption: "test caption",
          location: "www.s3.com/audiokey1",
        },
      ],
      videos: [
        {
          key: "videokey1",
          bucket: "mezzuzot media",
          caption: "test caption",
          location: "www.s3.com/videokey1",
        },
      ],
      images: [
        {
          key: "imagekey1",
          bucket: "mezzuzot media",
          caption: "someone play soccer",
          location: "www.s3.com/imagekey1",
        },
        {
          key: "imagekey2",
          bucket: "test bucket",
          caption: "test caption",
          location: "test location",
        },
      ],
    };
    var res = await dynamoDB.updateAbout(data);
    expect(res.result).toBe(true);
    expect(res.msg.category).toBe("flowerTEST");
    expect(res.msg.title).toBe("test title");
    expect(res.msg.description).toBe("updated test description");
    expect(res.msg.audios).toStrictEqual([
      {
        key: "audiokey1",
        bucket: "mezzuzot media",
        caption: "test caption",
        location: "www.s3.com/audiokey1",
      },
    ]);
    expect(res.msg.videos).toStrictEqual([
      {
        key: "videokey1",
        bucket: "mezzuzot media",
        caption: "test caption",
        location: "www.s3.com/videokey1",
      },
    ]);
    expect(res.msg.images).toStrictEqual([
      {
        key: "imagekey1",
        bucket: "mezzuzot media",
        caption: "someone play soccer",
        location: "www.s3.com/imagekey1",
      },
      {
        key: "imagekey2",
        bucket: "test bucket",
        caption: "test caption",
        location: "test location",
      },
    ]);
    done();
  });

  test("deleteAboutById", async (done) => {
    var res = await dynamoDB.deleteAboutById(id);
    expect(res.result).toBe(true);
    expect(res.msg).toBe(SUCCESSFULMSG);
    done();
  });
});

describe("dynamoDB Media", () => {
  var id;

  test("addMedia", async (done) => {
    data = {
      fileType: "video",
      category: "flower story",
      title: "title",
      description: "description",
      orderIndex: "orderIndex",
      s3: {
        bucket: "missing mezzuzot",
        key: "example_video.mp4",
        location: "www.s3.com/videokey1",
      },
    };

    var res = await dynamoDB.addMedia(data);
    id = res.msg.id;
    expect(res.result).toBe(true);
    done();
  });

  test("fetchMediaById", async (done) => {
    var res = await dynamoDB.fetchMediaById(id);
    expect(res.result).toBe(true);
    expect(res.msg.id).toBe(id);
    expect(res.msg.fileType).toBe("video");
    expect(res.msg.category).toBe("flower story");
    expect(res.msg.title).toBe("title");
    expect(res.msg.description).toBe("description");
    expect(res.msg.orderIndex).toBe("orderIndex");
    expect(res.msg.s3.bucket).toBe("missing mezzuzot");
    expect(res.msg.s3.key).toBe("example_video.mp4");
    expect(res.msg.s3.location).toBe("www.s3.com/videokey1");
    done();
  });

  test("fetchAllMedias", async (done) => {
    var res = await dynamoDB.fetchAllMedias();
    expect(res.result).toBe(true);
    expect(res.msg.length).toBeGreaterThan(0);
    done();
  });

  test("updateMedia", async (done) => {
    data = {
      id: id,
      fileType: "updated fileType", // updated fileType and location
      category: "flower story",
      title: "title",
      description: "description",
      orderIndex: "orderIndex",
      s3: {
        bucket: "missing mezzuzot",
        key: "example_video.mp4",
        location: "www.s3.com/updatedLocation",
      },
    };
    var res = await dynamoDB.updateMedia(data);
    expect(res.result).toBe(true);
    expect(res.msg.fileType).toBe("updated fileType");
    expect(res.msg.category).toBe("flower story");
    expect(res.msg.title).toBe("title");
    expect(res.msg.description).toBe("description");
    expect(res.msg.orderIndex).toBe("orderIndex");
    expect(res.msg.s3.bucket).toBe("missing mezzuzot");
    expect(res.msg.s3.key).toBe("example_video.mp4");
    expect(res.msg.s3.location).toBe("www.s3.com/updatedLocation");
    done();
  });

  test("deleteMediaById", async (done) => {
    var res = await dynamoDB.deleteMediaById(id);
    expect(res.result).toBe(true);
    expect(res.msg).toBe(SUCCESSFULMSG);
    done();
  });
});
