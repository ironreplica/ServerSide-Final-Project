const myController = require("../controllers");
const routes = require("express").Router();

routes.get("/", myController.testFunction);

module.exports = routes;