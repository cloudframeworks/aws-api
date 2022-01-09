const serviceNames = require("./serviceNames");
const serviceActions = require("./serviceActions");
const utilities = require("./utilities");

const APIKEY = process.env.APIKEY;

module.exports.handler = async (event) => {
  try {
    // validate api-key header, if error return 403
    if (!("api-key" in event.headers)) {
      return utilities.returnError(403, "Not Authorized.");
    }
    if (event.headers["api-key"] != APIKEY) {
      return utilities.returnError(403, "Not Authorized.");
    }

    // get name, if not provided, return 400
    const name = event.queryStringParameters.name;
    if (name == "") {
      return utilities.returnError(400, "Service Name invalid.");
    }

    // get service names, if error return 400
    const names = await serviceNames.getServiceNames();
    if (!names) {
      return utilities.returnError(400, "Service Names could not be found.");
    }
    // if name specified is not in service names, return 404
    if (!names.includes(name)) {
      return utilities.returnError(404, "Service Name not found.");
    }

    // get service actions, if error return 400
    const actions = await serviceActions.getServiceActions(name);
    if (!actions) {
      return utilities.returnError(400, "Service Actions could not be found.");
    }

    // return service actions
    return utilities.returnResults(actions);
  } catch (err) {
    // return 400
    return utilities.returnError(400, "Service Actions not found.");
  }
};
