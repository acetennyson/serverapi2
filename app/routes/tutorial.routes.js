module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Employee
  router.post("/rguser", tutorials.registerUser);
  router.post("/rgdoc", tutorials.registerDoc);

   // Login
  router.post("/lguser", tutorials.loginUser);
  router.post("/lgdoc", tutorials.loginDoc);

  // Record a new Employer

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve all Industries
  router.get("/industries", tutorials.getIndustries);

  // Retrieve all Industries
  router.get("/employers", tutorials.getEmployers);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Delete all Tutorials
  router.delete("/", tutorials.deleteAll);

  //get doctors from the database
  router.get("/getdocs", tutorials.getdoctors);
  routes.js








  app.use('/api/medic', router);
};