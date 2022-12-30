const AWS = require("aws-sdk");

const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require("uuid");

exports.createTodo = async (event, context) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  const params = {
    TableName: TODO_TABLE,
    Item: {
      id: uuid.v1(),
      todo: data.todo,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  if (typeof data.todo !== "string") {
    console.error("Validation Failed");
    return;
  }

  try {
    body = await dynamoDb.put((params)).promise();
  } catch (err) {
    statusCode = 400;
    body = err.message;
    console.log(err);
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};
