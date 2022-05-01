import React from "react";
import S3 from "react-aws-s3";

// filePath needs to just be the file path from the URL and NOT the full URL.
const config = {
  accessKeyId: "AKIA4L4WCCKGH545MSY6",
  secretAccessKey: "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",
  bucketName: "mezzuzot-media",
  region: "ap-southeast-2",
};

const ReactS3Client = new S3(config);

export const handleS3Deletes = async (array) => {
  let promiseArr = [];
  console.log(array);
  for (const element of array) {
    let deletePromise = handleDelete(element);
    promiseArr.push(deletePromise);
  }
  await Promise.all(promiseArr);
};

const handleDelete = (file) => {
  return new Promise((resolve, reject) => {
    ReactS3Client.deleteFile(file.key).then((data) => {
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

// This event should be invoked when the user has chosen to delete a specific file from the S3 bucket.
const handleClick = (event) => {
  event.preventDefault();
  const ReactS3Client = new S3(config);
  let filePath = document.getElementById("filePath").value;
  console.log(filePath);
  ReactS3Client.deleteFile(filePath)
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};
