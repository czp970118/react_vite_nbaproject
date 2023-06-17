module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");
  const user = require('../controllers/user.controller.js');
  const team = require('../controllers/team.controller.js');

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorials.create);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

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

  router.post('/login', user.login);

  router.get('/getAllTeams', team.getAllTeams);

  app.use('/api/tutorials', router);
};
