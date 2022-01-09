const aws = require("./aws");

const SERVICE_LIST = "SERVICE_LIST";
const SERVICE_OBJECT = "SERVICE_OBJECT";

module.exports = {
  SERVICE_LIST,
  SERVICE_OBJECT,
  /*
    getServiceNames
    Inputs:
    returnType (string) = SERVICE_LIST (list of short names) or SERVICE_OBJECT (list of objects including full name and short name)
    Returns:
    Success: AWS Service Names (JSON Array)
    Error: null 
  */
  getServiceNames: async function (returnType = SERVICE_LIST) {
    // get policies data from AWS
    const app = await aws.getPolicies();

    // success?
    if (app) {
      // get list of full names for object inclusion
      const fullNames = Object.keys(app.PolicyEditorConfig.serviceMap);
      // yes, process the app data to get the service names
      return Object.values(app.PolicyEditorConfig.serviceMap)
        .map((service, index) => {
          switch (returnType) {
            case SERVICE_LIST:
              return service["StringPrefix"];
            case SERVICE_OBJECT:
              return {
                fullName: fullNames[index],
                shortName: service["StringPrefix"],
              };
          }
        })
        .sort((a, b) => {
          switch (returnType) {
            case SERVICE_LIST:
              return a > b ? 1 : a < b ? -1 : 0;
            case SERVICE_OBJECT:
              return a.fullName > b.fullName
                ? 1
                : a.fullName < b.fullName
                ? -1
                : 0;
          }
        });
    }
    // no results, return null
    return null;
  },
};
