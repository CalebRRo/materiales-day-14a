const {loadUsers, storeUsers} = require('../data/db');
const {validationResult} = require('express-validator');

const bcryptjs = require('bcryptjs');


module.exports = {
    index : (req,res) => {
        return res.render("index")
    },
    about : (req,res) => {
        return res.render("about")
    },
    users : (req,res) => {
        return res.render("users")
    },
    contact : (req,res) => {
        return res.render("contact")
    },
    admin : (req,res) => {
        return res.render("admin",{
            user : req.query.user
        })
    },

    /*  REGISTER */
    register : (req,res) => {
        return res.render("register")
    },
    processRegister : (req,res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){   
            const {name,surname,email,password} = req.body;
            let users = loadUsers();
            let newUser = {
                id : users.length > 0 ? users[users.length - 1].id + 1 : 1,
                name : name.trim(),
                surname : surname.trim(),
                email : email.trim(),
                password : bcryptjs.hashSync(password,12),
                avatar : null
            }
            let usersModify = [...users, newUser];
            
            storeUsers(usersModify);
            
            return res.redirect('/login');
        }else{
            return res.render('register',{
                errors : errors.mapped(),
                old : req.body
            })
        }
        
    },
    
    /* LOGIN */
    login : (req,res) => {
        return res.render("login")
    },
    processLogin : (req,res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
    
        let {id,name,username, rol, avatar} = loadUsers().find(user => user.email === req.body.email);
    
        req.session.userLogin ={
            id,
            username,
            name,
            rol,
            avatar
        };
    
        if(req.body.remember){
            res.cookie('craftsy16',req.session.userLogin,{
                maxAge : 1000 * 60
            })
        }
    
            return res.redirect('/')
        }else {
            return res.render('login',{
                title: 'Login',
                errors : errors.mapped()
            })
        }
    },
    
}