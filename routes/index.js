const express = require("express");
const myController = require("../controllers");
const routes = require("express").Router();

routes.get("/", async (req, res) => {
  try {
    const locals = {
      title: "NodeJS Messenger",
      description:
        "A simple Messenging app built with NodeJs, EJS, MongoDB and Socket.io",
    };
    res.render("index", {
      locals,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = routes;
