const getServiceNames = require("../getServiceNames/index");
const { event } = require("../event.serviceNames");

(async function () {
  const results = await getServiceNames.handler(event);
  console.log(results);
})();
