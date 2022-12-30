const AWS = require("aws-sdk");
const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

let body;
let statusCode = 200;
const headers = {
  "Content-Type": "application/json",
};
//DELETE ITEMS
exports.deleteTodo = async (event, context) => {
  const params = {
    TableName: TODO_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };
  await dynamoDb.delete(params).promise();
  body = `Deleted todo ${event.pathParameters.id}`;

  return {
    statusCode,
    body,
    headers,
  };
};

