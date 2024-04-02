const axios = require('axios');

class NumberIsTooBig extends Error {
  constructor(n) {
    super(`${n} is too big!!!`);
    this.name = 'NumberIsTooBig';
    Error.captureStackTrace(this, NumberIsTooBig);
  }
}

module.exports.add = async (input, context, callback) => {
  console.log('printing input', { input });
  return input.x + input.y;
};

module.exports.double = async (output, context, callback) => {
  //Invoke third party api and wait for callback

  console.log('output ', { output });
  console.log('context ', { context });

  const apiEndpoint = process.env.API_ENDPOINT;
  console.log('apiEndpoint ', { apiEndpoint });

  const number = output.number;
  const taskToken = output.token;

  console.log('number ', { number });
  console.log('taskToken ', { taskToken });

  if (number > 250) {
    throw new NumberIsTooBig(output);
  }

  const data = {
    x: number,
    taskToken: taskToken,
  };
  console.log(data);
  try {
    // Making the HTTP request using async/await
    console.log('Invoking third party api');
    const response = await axios.post(apiEndpoint, data);
    console.log('response', { response });
    return response.data;
  } catch (error) {
    console.error('Error:', { error });
    throw error;
  }
};
