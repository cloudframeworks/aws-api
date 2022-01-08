# AWS API

API providing access to AWS services and tools. Implemented as discrete Lambda functions and a custom API Gateway HTTP API.

- getServiceNames: Returns a list of all AWS services.
- getServiceActions: Returns a list of all AWS service actions for a given service (using names provided by getServiceNames).

An APIKEY environment variable must be set in each function to access the API and then a corresponding api-key header must be included with each request.

Currently, a policies.js file is used to define the policies for each service. This will be replaced with a call to an AWS S3 bucket that contains the updated data.

Terraform template for implementing the API, Lambda functions and associated IAM roles/permissions will be added in the future.
