# AWS API

API providing access to AWS services and tools. Implemented as discrete Lambda functions and a custom API Gateway HTTP API.

- getServiceNames: Returns a list of all AWS services, either short names (for getServiceActions call) or objects with full names and short names for front-end display and subsequent calls.
- getServiceActions: Returns a list of all AWS service actions for a given service (using short names provided by getServiceNames).

An APIKEY environment variable must be set in each function to access the API and then a corresponding api-key header must be included with each request.

Terraform template for implementing the API, Lambda functions and associated IAM roles/permissions will be added in the future.

# UPDATES

- Converted from looping through objects to using mapping and filtering.
- Added support for returning service name list only (short names) or service name object (full name and short name).
- Moved AWS API calls to separate modules and added 10 second timeout for call.

# TESTING

Run the following commands to install dependencies for each api function:

```
cd /api/getServiceNames
npm install
cd ../getServiceActions
npm install
```

In the tests folder:

- set APIKEY environment variable using the .env file command
- run the following commands to run the tests:

```
cd /tests
npm test
```
