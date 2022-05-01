/*
 *   Test file for router.js. Responsible for testing all functions related
 *   with router.js
 */

const request = require("supertest");
const app = require("../app");

describe("Admin endpoints", () => {
  // You need to change the id fields as a real id that
  // exists in the system before each test.

  var flower_id = "39353647-b60d-4157-a0ca-1aa1fd7a0393";
  var mm_id = "0d796189-4d8c-4a18-8135-4c759dc62769";
  var media_id = "efd58b7c-feb2-4808-a4bc-025b31cac98a";
  var aboutId;

  it("should add a new Flower Story", async (done) => {
    const res = await request(app)
      .post("/api/admin/flower")
      .send({
        briefDescription: "test brief description",
        detailedDescription: "test detailed description",
        familyName: "test familyName",
        familyMembers: "test familyMembers",
        address: "test address",
        flowerType: "1",
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
      });
    expect(res.statusCode).toEqual(200);
    done();
  });

  it("should update the Flower Story with id", async (done) => {
    const res = await request(app)
      .post("/api/admin/flower")
      .send({
        id: flower_id,
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
            key: "imagekey3",
            bucket: "test bucket",
            caption: "test caption",
            location: "test location",
          },
        ],
        link: "test link",
      });
    expect(res.statusCode).toEqual(200);
    done();
  });

  it("should fetch a Flower Story with id", async (done) => {
    const res = await request(app).get("/api/flower/" + flower_id);
    var body = res.body.message;
    expect(res.statusCode).toEqual(200);
    expect(body.briefDescription).toBe("updated brief description");
    expect(body.detailedDescription).toBe("test detailed description");
    expect(body.familyName).toBe("test familyName");
    expect(body.familyMembers).toBe("test familyMembers");
    expect(body.address).toBe("test address");
    expect(body.flowerType).toBe("test flowerType");
    expect(body.audios).toStrictEqual([
      {
        key: "audiokey1",
        bucket: "mezzuzot media",
        caption: "test caption",
        location: "www.s3.com/audiokey1",
      },
    ]);
    expect(body.videos).toStrictEqual([
      {
        key: "videokey1",
        bucket: "mezzuzot media",
        caption: "test caption",
        location: "www.s3.com/videokey1",
      },
    ]);
    expect(body.images).toStrictEqual([
      {
        key: "imagekey1",
        bucket: "mezzuzot media",
        caption: "someone play soccer",
        location: "www.s3.com/imagekey1",
      },
      {
        key: "imagekey3",
        bucket: "test bucket",
        caption: "test caption",
        location: "test location",
      },
    ]);
    expect(body.link).toBe("test link");
    done();
  });

  it("should fetch all videos", async (done) => {
    const res = await request(app).get("/api/video/flower");
    var body = res.body.message;
    expect(res.statusCode).toEqual(200);
    expect(body.length).toBeGreaterThan(0);
    done();
  });

  it("should fetch all flower stories", async (done) => {
    const res = await request(app).get("/api/flower");
    var body = res.body.message;
    expect(res.statusCode).toEqual(200);
    expect(body.length).toBeGreaterThan(0);
    done();
  });

  it("should delete Flower Story with id", async (done) => {
    const res = await request(app).post("/api/admin/flower/delete").send({
      id: flower_id,
    });
    expect(res.statusCode).toEqual(200);
    done();
  });

  //////////Tests for missing mezzuzot endpoints///////////
  it("should add a new Mezzuzah Story", async (done) => {
    const res = await request(app)
      .post("/api/admin/mm")
      .send({
        briefDescription: "test brief description",
        detailedDescription: "test detailed description",
        familyName: "test familyName",
        familyMembers: "test familyMembers",
        address: "test address",
        //"flowerType": "test flowerType",
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
      });
    expect(res.statusCode).toEqual(200);
    done();
  });

  it("should update the Mezzuzah Story with id", async (done) => {
    const res = await request(app)
      .post("/api/admin/mm")
      .send({
        id: mm_id,
        briefDescription: "updated brief description",
        detailedDescription: "test detailed description",
        familyName: "test familyName",
        familyMembers: "test familyMembers",
        address: "test address",
        //"flowerType": "test flowerType",
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
            key: "imagekey3",
            bucket: "test bucket",
            caption: "test caption",
            location: "test location",
          },
        ],
        link: "test link",
      });
    expect(res.statusCode).toEqual(200);
    done();
  });

  it("should fetch a Mezzuzah Story with id", async (done) => {
    const res = await request(app).get("/api/mm/" + mm_id);
    expect(res.statusCode).toEqual(200);
    done();
  });

  it("should fetch all Mezzuzah stories", async (done) => {
    const res = await request(app).get("/api/mm");
    var body = res.body.message;
    expect(res.statusCode).toEqual(200);
    expect(body.length).toBeGreaterThan(0);
    done();
  });

  it("should delete Mezzuzah Story with id", async (done) => {
    const res = await request(app).post("/api/admin/mm/delete").send({
      id: mm_id,
    });
    expect(res.statusCode).toEqual(200);
    done();
  });

  //////////Tests for media endpoints///////////
  it("should add a new Media", async (done) => {
    const res = await request(app)
      .post("/api/admin/media")
      .send({
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
      });
    expect(res.statusCode).toEqual(200);
    done();
  });

  it("should update the Media with id", async (done) => {
    const res = await request(app)
      .post("/api/admin/media")
      .send({
        id: media_id,
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
      });
    var body = res.body.message;
    done();
  });

  it("should fetch a Media with id", async (done) => {
    const res = await request(app).get("/api/media/" + media_id);
    var body = res.body.message;
    expect(res.statusCode).toEqual(200);
    expect(body.fileType).toBe("updated fileType");
    expect(body.category).toBe("flower story");
    // expect(body.caption).toBe("test caption");
    expect(body.description).toBe("description");
    expect(body.orderIndex).toBe("orderIndex");
    expect(body.s3.bucket).toBe("missing mezzuzot");
    expect(body.s3.key).toBe("example_video.mp4");
    expect(body.s3.location).toBe("www.s3.com/updatedLocation");
    done();
  });

  it("should fetch all Medias", async (done) => {
    const res = await request(app).get("/api/media");
    var body = res.body.message;
    expect(res.statusCode).toEqual(200);
    expect(body.length).toBeGreaterThan(0);
    done();
  });

  it("should delete Media with id", async (done) => {
    const res = await request(app).post("/api/admin/media/delete").send({
      id: media_id,
    });
    expect(res.statusCode).toEqual(200);
    done();
  });

  it("should fetch all Abouts", async (done) => {
    const res = await request(app).get("/api/about/mm");
    expect(res.statusCode).toEqual(200);
    done();
  });
});
