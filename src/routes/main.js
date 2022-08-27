const express = require("express");
const {index,contact,users,about,admin,login,register,processRegister} = require("../controllers/mainController");


const router = express.Router();

const accessAdmin = require("../middlewares/accessAdmin");

router
      .get("/", index)
      .get("/users", users)
      .get("/about", about)
      .get("/contact", contact)
      .get("/admin", accessAdmin,admin)
       
      /* USERS-lOGIN */
      .get("/login", login)

       /* USERS-register */
      .get("/register", register)
      .post('/register', processRegister)


      
      

module.exports = router;