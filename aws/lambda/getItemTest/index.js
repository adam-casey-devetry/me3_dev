"use strict";
const AWS = require("aws-sdk");
const regionString = "us-west-2";

AWS.config.update({ region: regionString });

// Handler is the function being exported
exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: regionString });
  const documentClient = new AWS.DynamoDB.DocumentClient({
    region: "us-west-2"
  });

  let responseBody = "";
  let statusCode = 0;

  const { id } = event.pathParameters;

  // The item we want to pull out of the table
  const params = {
    TableName: "adamTestDBTable",
    Key: {
      id: id
    }
  };
  try {
    const data = await documentClient.get(params).promise();
    // Return a properly formatted response for API Gateway
    responseBody = JSON.stringify(data.Item);
    statusCode = 200;
  } catch (err) {
    responseBody = "Unable to get user data";
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      myHeader: "test"
    },
    body: responseBody
  };
  return response;
};
