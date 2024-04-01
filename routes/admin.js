const express = require("express");
const myController = require("../controllers");
const routes = require("express").Router();
const User = require("../models/User");
const adminLayoutURL = "../views/layouts/admin";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtSecret = process.env.JWT_SECRET;

//* Register Account, POST /register
routes.post("/create-account", async (req, res) => {
  try {
    const { username, password } = req.body; //! Error protection here?
    const hashedPassword = await bcrypt.hash(password, 10); // Hasing the password
    try {
      const user = await User.create({
        username,
        password: hashedPassword,
      });
      res.status(201).json({ message: "User made.", user });
    } catch (error) {
      if (error === 11000) {
        return res
          .status(500)
          .json({ message: "User already exists. Try again.", user });
      } else {
        return res.status(500).json({ message: "Something went wrong." });
      }
    }

    console.log(req.body);
    ////res.render("admin/index",{locals,layout:adminLayoutURL});
  } catch (error) {
    console.log(error);
  }
});

//* Login Account, POST /login
routes.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }); // Search DB for a student.

    if (!user) {
      // If the username does not exist in the DB, return.
      return res
        .status(401)
        .json({ message: "Invalid credentials. Try again.", username });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Variable set by comparing the typed password (hashed) to the password (hashed) associated with the username in the DB.

    if (!isPasswordValid) {
      // If the password is NOT valid, return.
      return res
        .status(401)
        .json({ message: "Invalid credentials. Try again.", username });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret); //! What is JWT Secret?
    console.log(token);
    res.cookie("token", token, { httpOnly: true });

    console.log("Login succesful!");
    ////res.redirect("/create-drawing");
  } catch (error) {
    console.log(error);
  }
});

module.exports = routes;
/**
 * TODO: User authMiddleware: Jsonwebtoken, bcrypt, attach the create accounts page
 * TODO: with the admin routes for creating account. The buttons follow the respective CRUD methods
 * TODO: and the form actions. Refer to the Node-Js-BLOG assign.
 *
 * TODO: For testing you can use the REST Client plugin.
 *
 */

// Login Account, POST /login
