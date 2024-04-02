const AWS = require('aws-sdk');
const stepFunctions = new AWS.StepFunctions();

class NumberIsTooBig extends Error {
  constructor(n) {
    super(`${n} is too big!!!`);
    this.name = 'NumberIsTooBig';
    Error.captureStackTrace(this, NumberIsTooBig);
  }
}

module.exports.double = async (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const number = requestBody.x;
  const tasktoken = requestBody.taskToken;

  console.log('requestBody ' + number);
  console.log('taskToken ' + tasktoken);

  const output = number * 2;

  const response = {
    statusCode: 200,
    body: JSON.stringify(output),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  if (tasktoken) {
    if (output >= 500) {
      const error = new NumberIsTooBig(output);
      await stepFunctions
        .sendTaskFailure({
          taskToken: tasktoken,
          error: JSON.stringify(error),
        })
        .promise();
    }

    await stepFunctions
      .sendTaskSuccess({
        taskToken: tasktoken,
        output: JSON.stringify(response),
      })
      .promise();
  }

  return response;
};
