const policies = require("./policies");
const utilities = require("./utilities");

const APIKEY = process.env.APIKEY;

const getServiceNames = () => {
  let serviceNames = [];
  for (const service in policies.policyData.serviceMap) {
    serviceNames.push(policies.policyData.serviceMap[service]["StringPrefix"]);
  }
  return serviceNames.sort();
};

const getServiceActions = (serviceName) => {
  let serviceActions = [];
  for (const service in policies.policyData.serviceMap) {
    if (
      policies.policyData.serviceMap[service]["StringPrefix"] === serviceName
    ) {
      serviceActions = policies.policyData.serviceMap[service]["Actions"];
    }
  }
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

    const serviceNames = getServiceNames();
    if (!serviceNames.includes(name)) {
      return utilities.returnError(404, "Service Name not found.");
    }

    return utilities.returnResults(getServiceActions(name));
  } catch (err) {
    return utilities.returnError(403, "Not Authorized.");
  }
};
