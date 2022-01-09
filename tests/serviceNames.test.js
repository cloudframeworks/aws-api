const serviceNames = require("../getServiceNames/serviceNames");

// (async function () {
//   const actions = await serviceNames.getServiceNames();
//   console.log(actions);
// })();

(async function () {
  const actions = await serviceNames.getServiceNames("SERVICE_OBJECT");
  console.log(actions);
})();
