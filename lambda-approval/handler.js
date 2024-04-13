const AWS = require('aws-sdk');
const stepFunctions = new AWS.StepFunctions();

module.exports.approve = async (event, context, callback) => {
  const requestBody = JSON.parse(event.body);

  const tasktoken = requestBody.taskToken;

  console.log('taskToken ' + tasktoken);

  const response = {
    statusCode: 200,
    body: { approved: true },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  await stepFunctions
    .sendTaskSuccess({
      taskToken: tasktoken,
      output: JSON.stringify(response),
    })
    .promise();

  return response;
};

module.exports.reject = async (event, context, callback) => {
  const requestBody = JSON.parse(event.body);

  const tasktoken = requestBody.taskToken;

  console.log('requestBody ' + number);
  console.log('taskToken ' + tasktoken);

  const response = {
    statusCode: 200,
    body: { approved: false },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  await stepFunctions
    .sendTaskSuccess({
      taskToken: tasktoken,
      output: JSON.stringify(response),
    })
    .promise();

  return response;
};
