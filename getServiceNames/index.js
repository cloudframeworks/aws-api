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

module.exports.handler = async (event) => {
  try {
    const apiKey = event.headers["api-key"] ?? "";
    if (apiKey != APIKEY) {
      return utilities.returnError(403, "Not Authorized.");
    }

    const serviceNames = await getServiceNames();
    return utilities.returnResults(serviceNames);
  } catch (err) {
    return utilities.returnError(403, "Not Authorized.");
  }
};

names = getServiceNames();
