const serviceActions = require("../getServiceActions/serviceActions");

(async function () {
  const actions = await serviceActions.getServiceActions("dms");
  console.log(actions);
})();
