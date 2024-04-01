const express = require("express");
const myController = require("../controllers");
const routes = express.Router();

routes.get("/", async (req, res) => {
  try {
    const locals = {
      title: "PictoJS",
      description:
        "A Drawing Messenging app built with NodeJs, EJS, MongoDB and Socket.io",
    };
    res.render("admin/create-drawing", {
      locals,
    });
  } catch (error) {
    console.log(error);
  }
});

routes.get("/register", async(req,res) => {
  try {
    const locals = {
      title: "PictoJS",
      description:
        "A Drawing Messenging app built with NodeJS, EJS, MongoDB and Socket.io"
    };
    res.render("admin/index",{
      locals,
    })
  } catch (error) {
    console.log(error);
  }
})

module.exports = routes;
