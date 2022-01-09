const axios = require("axios");
const utilities = require("./utilities");

const APIKEY = process.env.APIKEY;

/*
  getServiceNames
  Inputs: None
  Returns: AWS Service Names (JSON Array)
*/

const getServiceNames = async () => {
  // initialize app object for import and service names
  let app = {};
  let serviceNames = [];

  try {
    // get policy data from AWS S3 location
    const policiesData = await axios.get(
      "https://awspolicygen.s3.amazonaws.com/js/policies.js",
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    // add the JSON data to the app object
    eval(policiesData.data);

    // process the app data to get the service names
    for (const service in app.PolicyEditorConfig.serviceMap) {
      serviceNames.push(
        app.PolicyEditorConfig.serviceMap[service]["StringPrefix"]
      );
    }
  } catch (err) {}

  return serviceNames.sort();
};

/*
  getServiceActions
  Inputs: serviceName (string) = Service Name
  Returns: AWS Service Actions (JSON Array)
*/

const getServiceActions = async (serviceName) => {
  // initialize app object for import and service actions
  let app = {};
  let serviceActions = [];

  try {
    // get policy data from AWS S3 location
    const policiesData = await axios.get(
      "https://awspolicygen.s3.amazonaws.com/js/policies.js",
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    // add the JSON data to the app object
    eval(policiesData.data);

    // process the app data to get the service actions
    for (const service in app.PolicyEditorConfig.serviceMap) {
      if (
        app.PolicyEditorConfig.serviceMap[service]["StringPrefix"] ===
        serviceName
      ) {
        serviceActions = app.PolicyEditorConfig.serviceMap[service]["Actions"];
      }
    }
  } catch (err) {}

  return serviceActions.sort();
};

module.exports.handler = async (event) => {
  try {
    const apiKey = event.headers["api-key"] ?? "";
    if (apiKey != APIKEY) {
      return utilities.returnError(403, "Not Authorized.");
    }

    const name = event.queryStringParameters.name ?? "";
    if (name == "") {
      return utilities.returnError(400, "Service Name invalid.");
    }

    const serviceNames = await getServiceNames();
    if (!serviceNames.includes(name)) {
      return utilities.returnError(404, "Service Name not found.");
    }

    const serviceActions = await getServiceActions(name);
    return utilities.returnResults(serviceActions);
  } catch (err) {
    return utilities.returnError(403, "Not Authorized.");
  }
};
