const express = require("express");
const {index,contact,users,about,admin,login,register,processRegister, processLogin} = require("../controllers/mainController");

const router = express.Router();

const {registerValidator, loginValidator} = require('../validations');

const accessAdmin = require("../middlewares/accessAdmin");


router
      .get("/", index)
      .get("/users", users)
      .get("/about", about)
      .get("/contact", contact)
      .get("/admin", accessAdmin,admin)
       
      /* USERS-register */
      .get("/register", register)
      .post('/register',registerValidator, processRegister)
      
      /* USERS-lOGIN */
      .get("/login", login)
      .post("/login",loginValidator, processLogin)

      
      

module.exports = router;