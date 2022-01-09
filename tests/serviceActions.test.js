const getServiceActions = require("../getServiceActions/index");
const { event } = require("../event.serviceActions");

(async function () {
  const results = await getServiceActions.handler(event);
  console.log(results);
})();
