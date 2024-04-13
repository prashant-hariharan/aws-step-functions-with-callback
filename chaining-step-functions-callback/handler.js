const axios = require('axios');

class NumberIsTooBig extends Error {
  constructor(n) {
    super(`${n} is too big!!!`);
    this.name = 'NumberIsTooBig';
    Error.captureStackTrace(this, NumberIsTooBig);
  }
}

module.exports.calculate = async (input, context, callback) => {
  console.log('printing input', { input });

  const number = input.number.x + input.number.y;
  const taskToken = input.token;

  console.log('number ', { number });
  console.log('taskToken ', { taskToken });

  if (number > 250) {
    throw new NumberIsTooBig(output);
  }

  try {
    // Making the HTTP request using async/await to double the amount using external api
    const apiEndpoint = process.env.API_ENDPOINT;
    console.log('apiEndpoint ', { apiEndpoint });

    const data = {
      x: number,
      taskToken: taskToken,
    };

    console.log(
      ' Making the HTTP request using async/await to double the amount using external api'
    );
    const response = await axios.post(apiEndpoint, data);
    console.log('response', { response });
    return response.data;
  } catch (error) {
    console.error('Error:', { error });
    throw error;
  }
};

module.exports.approval = async (output, context, callback) => {
  //Invoke approval flow

  console.log('output ', { output });
  console.log('context ', { context });

  const apiEndpoint = process.env.API_ENDPOINT;
  console.log('apiEndpoint ', { apiEndpoint });

  const number = output.number;
  const taskToken = output.token;

  console.log('number ', { number });
  console.log('taskToken ', { taskToken });
};

module.exports.finalize = async (output, context, callback) => {
  //Invoke approval flow

  console.log('output ', { output });

  return output;
};
