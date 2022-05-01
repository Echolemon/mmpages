import S3 from "react-aws-s3";

const config = {
  accessKeyId: "AKIA4L4WCCKGH545MSY6",
  secretAccessKey: "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",
  bucketName: "mezzuzot-media",
  region: "ap-southeast-2",
};

var { v4: uuidv4 } = require("uuid");

export const handleS3Uploads = async (newArr) => {
  let outputArr = [];
  let promiseArr = [];

  for (const element of newArr) {
    let uploadPromise = handleUpload(element).then((data) => {
      outputArr.push(data);
    });
    promiseArr.push(uploadPromise);
  }
  await Promise.all(promiseArr);
  return outputArr;
};

export const handleUpload = (file) => {
  return new Promise((resolve, reject) => {
    let newFileName = uuidv4();
    const ReactS3Client = new S3(config);

    ReactS3Client.uploadFile(file, newFileName).then((data) => {
      if (data.status === 204) {
        console.log("success");
        resolve(data);
      } else {
        console.log("fail");
        reject("fail");
      }
    });
  });
};
