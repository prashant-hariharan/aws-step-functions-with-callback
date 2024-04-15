const axios = require('axios');
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });

class NumberIsTooBig extends Error {
  constructor(n) {
    super(`${n} is too big!!!`);
    this.name = 'NumberIsTooBig';
    Error.captureStackTrace(this, NumberIsTooBig);
  }
}

/**
 * Handler method to add 2 numbers and double the output by invoking a third party api
 * @param  input - The input from api- Expects parameters x and y which are integers in request body
 * @param  context - N/A
 * @param  callback  - N/A
 * @returns output as a number
 */
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
/**
 *Handler method to trigger email notification.
 This is a callback type of task, which will wait for the output by an external invocation
 * @param input - Computed number
 * @param  context - N/A
 * @param  callback- N/A
 */
module.exports.approval = async (input, context, callback) => {
  //Invoke approval flow

  const approvalEndpoint = process.env.APPROVAL_ENDPOINT;
  const rejectionEndpoint = process.env.REJECTION_ENDPOINT;
  const email = process.env.RECEPIENT_EMAIL;

  console.log('input ', { input });

  console.log('Sending email');

  const number = input.number;
  const taskToken = input.token;

  console.log('number ', { number });
  console.log('taskToken ', { taskToken });

  const params = {
    Destination: {
      ToAddresses: [email], // Replace with recipient email
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
                    <html>
                    <body>
                        <h1>Hello!</h1>
                        <p>You can Approve / Reject yor task with following Urls :</p>
                        Approval: ${approvalEndpoint}
                        <br>
                        Rejection: ${rejectionEndpoint}
                        <br>
                        Your temp token is: ${taskToken}
                    </body>
                    </html>
                `,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Test Email with Link',
      },
    },
    Source: email, // Replace with sender email
  };

  try {
    const data = await ses.sendEmail(params).promise();
    console.log('Email sent:', data);
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

module.exports.finalize = async (output, context, callback) => {
  //Invoke approval flow

  console.log('output ', { output });

  return output;
};
