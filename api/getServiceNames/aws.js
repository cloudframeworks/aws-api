const axios = require("axios");

module.exports = {
  getPolicies: async function () {
    // initialize app object for import
    let app = {};

    try {
      /*
      get policies data from AWS S3 location
      policies.data has the form app.PolicyEditorConfig = {}
    */
      const policies = await axios.get(
        "https://awspolicygen.s3.amazonaws.com/js/policies.js",
        {
          // set call timeout to 10 seconds
          // include CORS headers
          timeout: 10000,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      // add the JSON data to the app object
      eval(policies.data);
    } catch (err) {
      // on error return blank app object
      console.log(err);
    }

    return app;
  },
};
