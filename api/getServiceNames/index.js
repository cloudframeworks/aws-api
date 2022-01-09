const serviceNames = require("./serviceNames");
const utilities = require("./utilities");

const APIKEY = process.env.APIKEY;

module.exports.handler = async (event) => {
  try {
    // validate api-key header, if error return 403
    const apiKey = event.headers;
    if (!("api-key" in event.headers)) {
      return utilities.returnError(403, "Not Authorized.");
    }
    if (event.headers["api-key"] != APIKEY) {
      return utilities.returnError(403, "Not Authorized.");
    }

    // get return type (optional, defaults to service list)
    let returnType = serviceNames.SERVICE_LIST;
    if (
      "queryStringParameters" in event &&
      "returnType" in event.queryStringParameters
    ) {
      returnType = event.queryStringParameters.returnType;
    }

    // get service names, if error return 400
    const names = await serviceNames.getServiceNames(returnType);
    if (!names) {
      return utilities.returnError(
        400,
        "Service Names could not be found or invalid return type provided."
      );
    }

    // return service names
    return utilities.returnResults(names);
  } catch (err) {
    // return 400
    return utilities.returnError(400, "Service Names not found.");
  }
};
