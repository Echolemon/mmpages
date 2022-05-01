// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
let awsConfig = {
  "region": "us-east-1",
  "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
  "accessKeyId": "AKIAU5VANDLK3VFMLE5Z",
  "secretAccessKey":"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"
}
AWS.config.update(awsConfig);

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
var docClient = new AWS.DynamoDB.DocumentClient();

var deleteFlowerStoryParams = {
  TableName: 'FlowerStory'
};

var deleteMezzuzahStoryParams = {
  TableName: 'MezzuzahStory'
};

var deleteNextMezzuzahStoryParams = {
  TableName: 'NextMezzuzahStory'
};

// Call DynamoDB to delete the specified table
ddb.deleteTable(deleteFlowerStoryParams, function(err, data) {
  if (err && err.code === 'ResourceNotFoundException') {
    console.log("Error: Table not found");
  } else if (err && err.code === 'ResourceInUseException') {
    console.log("Error: Table in use");
  } else {
    console.log("Delete Success", data);
  }
});

ddb.deleteTable(deleteMezzuzahStoryParams, function(err, data) {
  if (err && err.code === 'ResourceNotFoundException') {
    console.log("Error: Table not found");
  } else if (err && err.code === 'ResourceInUseException') {
    console.log("Error: Table in use");
  } else {
    console.log("Delete Success", data);
  }
});

ddb.deleteTable(deleteNextMezzuzahStoryParams, function(err, data) {
  if (err && err.code === 'ResourceNotFoundException') {
    console.log("Error: Table not found");
  } else if (err && err.code === 'ResourceInUseException') {
    console.log("Error: Table in use");
  } else {
    console.log("Delete Success", data);
  }
});

var createFlowerStoryParams = {
  AttributeDefinitions: [
    {
      AttributeName: 'id',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'id',
      KeyType: 'HASH'
    }

  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: 'FlowerStory',
  StreamSpecification: {
    StreamEnabled: false
  }
};

var createMezzuzahStoryParams = {
  AttributeDefinitions: [
    {
      AttributeName: 'id',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'id',
      KeyType: 'HASH'
    }

  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: 'MezzuzahStory',
  StreamSpecification: {
    StreamEnabled: false
  }
};

var createNextMezzuzahStoryParams = {
  AttributeDefinitions: [
    {
      AttributeName: 'id',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'id',
      KeyType: 'HASH'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: 'NextMezzuzahStory',
  StreamSpecification: {
    StreamEnabled: false
  }
};

// Call DynamoDB to create the table
ddb.waitFor('tableNotExists', deleteFlowerStoryParams, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    ddb.createTable(createFlowerStoryParams, function(errCreate, dataCreate) {
      if (errCreate) {
        console.log("Error", errCreate);
      } else {
        console.log("Table Created", dataCreate);
      }
    });
  }          // successful response
});

ddb.waitFor('tableNotExists', deleteMezzuzahStoryParams, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    ddb.createTable(createMezzuzahStoryParams, function(errCreate, dataCreate) {
      if (errCreate) {
        console.log("Error", errCreate);
      } else {
        console.log("Table Created", dataCreate);
      }
    });
  }          // successful response
});

ddb.waitFor('tableNotExists', deleteNextMezzuzahStoryParams, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    ddb.createTable(createNextMezzuzahStoryParams, function(errCreate, dataCreate) {
      if (errCreate) {
        console.log("Error", errCreate);
      } else {
        console.log("Table Created", dataCreate);
      }
    });
  }          // successful response
});
