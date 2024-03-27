const express = require("express");
const myController = require("../controllers");
const routes = require("express").Router();

/**
 * User authMiddleware: Jsonwebtoken, bcrypt, attach the create accounts page
 * with the admin routes for creating account. The buttons follow the respective CRUD methods
 * and the form actions. Refer to the Node-Js-BLOG assign.
 * 
 * For testing you can use the REST Client plugin.
 */

// Register Account, POST /register

// Login Account, POST /login