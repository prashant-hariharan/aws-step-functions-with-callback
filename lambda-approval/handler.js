const AWS = require('aws-sdk');
const stepFunctions = new AWS.StepFunctions();

module.exports.approve = async (event, context, callback) => {
  const requestBody = JSON.parse(event.body);

  const tasktoken = requestBody.taskToken;

  console.log('taskToken ' + tasktoken);

  const output = {
    approved: 'true',
  };

  const response = {
    statusCode: 200,
    body: JSON.stringify(output),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  };
  try {
    await stepFunctions
      .sendTaskSuccess({
        taskToken: tasktoken,
        output: JSON.stringify(output),
      })
      .promise();
    console.log('Task Success sent to Step function ');

    console.log('Sending response to Lambda');

    return response;
  } catch (err) {
    console.error('Failed to send task success:', err);
    return {
      statusCode: 500,
      body: JSON.stringify(`Failed to send task success: ${err}`),
    };
  }
};

module.exports.reject = async (event, context, callback) => {
  const requestBody = JSON.parse(event.body);

  const tasktoken = requestBody.taskToken;

  console.log('requestBody ' + number);
  console.log('taskToken ' + tasktoken);

  const output = {
    approved: 'false',
  };

  const response = {
    statusCode: 200,
    body: JSON.stringify(output),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  };

  try {
    await stepFunctions
      .sendTaskSuccess({
        taskToken: tasktoken,
        output: JSON.stringify(output),
      })
      .promise();

    console.log('Task Failure sent to Step function ');

    console.log('Sending response to Lambda');

    return response;
  } catch (err) {
    console.error('Failed to send task success:', err);
    return {
      statusCode: 500,
      body: JSON.stringify(`Failed to send task success: ${err}`),
    };
  }
};
