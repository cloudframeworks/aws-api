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

module.exports.handler = async (event) => {
  try {
    const apiKey = event.headers["api-key"] ?? "";
    if (apiKey != APIKEY) {
      return utilities.returnError(403, "Not Authorized.");
    }

    return utilities.returnResults(getServiceNames());
  } catch (err) {
    return utilities.returnError(403, "Not Authorized.");
  }
};
