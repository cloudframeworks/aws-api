const aws = require("./aws");

module.exports = {
  /*
    getServiceActions
    Inputs:
    serviceName (string) = Service Name
    Returns:
    Success: AWS Service Actions (JSON Array)
    Error: null 
  */
  getServiceActions: async function (serviceName) {
    // get policies data from AWS
    const app = await aws.getPolicies();

    // success?
    if (app) {
      // yes, process the app data to get the service names
      return Object.values(app.PolicyEditorConfig.serviceMap)
        .filter((service) => serviceName === service["StringPrefix"])
        .map((service) => service["Actions"])
        .flat()
        .sort();
    }
    // no results, return null
    return null;
  },
};
