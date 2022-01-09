module.exports = {
  returnError: function (number, message) {
    const errorMessage = "ERROR: " + message;
    console.log(errorMessage);
    return {
      statusCode: number,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        results: errorMessage,
      }),
    };
  },

  returnResults: function (results) {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        results: results,
      }),
    };
  },
};
