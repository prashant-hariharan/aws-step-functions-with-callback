# Pre-requisites
AWS Account with an IAM user and aws cli configured.

# Basic Setup
execute following commands:
  - aws configure    (to configure AWS on your machine)
  - npm install -g serverless  ( install serverless framework node js package)

# Project specific commands
If you are creating serverless projects from scratch, the following commands are useful:

  - serverless create --template aws-nodejs --path <name>   (This will create a new serverless project)
  - npm init -y    (This will initialize the nodejs project)
  - npm install --save-dev serverless-step-functions   (This will add a dev dependency for step functions plugin)

If you are working on an existing project
  - serverless deploy  (this will deploy the project on to aws)
  - serverless remove  (this will delete the created artefacts from AWS)
  

