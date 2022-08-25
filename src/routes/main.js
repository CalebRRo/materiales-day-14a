const express = require("express");
const {index,contact,music,about,admin,login} = require("../controllers/mainController");
const router = express.Router();

const accessAdmin = require("../middlewares/accessAdmin");

router
      .get("/", index)
      .get("/music", music)
      .get("/about", about)
      .get("/contact", contact)
      .get("/admin", accessAdmin,admin)
      .get("/login", login)
      

module.exports = router;