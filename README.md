# Pre-requisites

- AWS Account with an IAM user and aws cli configured.
- an Email address needs to be setup in the AWS SES service.

# Basic Setup

execute following commands:

- aws configure (to configure AWS on your machine)
- npm install -g serverless ( install serverless framework node js package)

# Project specific commands

If you are creating serverless projects from scratch, the following commands are useful:

- serverless create --template aws-nodejs --path [ name of the project] (This will create a new serverless project)
- npm init -y (This will initialize the nodejs project)
- npm install --save-dev serverless-step-functions (This will add a dev dependency for step functions plugin)

If you are working on an existing project, run the following commands on each sub projects (lambda-approval,
lambda-api-gateway,chaining-step-functions-callback)

- npm install --save-dev serverless-step-functions
- npm install 
- serverless deploy (this will deploy the project on to aws)
- serverless remove (this will delete the created artefacts from AWS)

# Steps to run the example

- Navigate to the **lambda-approval** project and execute the command **serverless deploy**.
  This will deploy the lambda function and expose an API gateway with paths to approve and reject task. Kindly note down the URL of the api gateway as we need to invoke this from Postman for approving & rejecting tasks.

- Navigate to the **lambda-api-gateway** project and execute the command **serverless deploy**.
  This will deploy the lambda function and expose an API gateway. Kindly note down the URL of the api gateway as we need to invoke this from the step function

- Navigate to the **chaining-step-functions-callback** project.
  Update the env.json(API_ENDPOINT) with the url of the api gateway from lambda-api-gateway step / Previous Step.

  Additionally also add entries for APPROVAL_ENDPOINT,REJECTION_ENDPOINT from the api endpoint generated by the **lambda-approval** project.

  Lastly add the email address on which you want to receive email notification. This has to be pre-registered on AWS SES as mentioned in the pre-requisites.

  Execute the command **serverless deploy**.
  Kindly note down the URL of the api gateway generated from this step.

- Make a post request to the api gateway url from the above step with request body like :
  {
  "x": 125,
  "y": 124
  }

- Navigate to your AWS console (UI), and check the execution of your Step function by searching for the Step function service.
  The logs for the execution will be available as a logstream in cloud watch.

  ![Alt text](aws_step_functions.png?raw=true 'Step function execution')

# Pricing

The pricing will be based on the costs for following resources:

- S3 bucket - the source code will be placed on S3 buckets. (storage costs)
- Cost of invocation for the underlying lambda functions
- Cost of state transitions for the step functions

The following link should give you a rough estimation of the costs: https://calculator.aws/#/createCalculator/StepFunctions

# Deletion

Run the command **_serverless remove_** in each of the subfolders to completely delete the stack
