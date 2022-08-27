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
    login : (req,res) => {
        return res.render("login")
    },

    register : (req,res) => {
    return res.render("register")
    },
    processRegister : (req,res) => {
        const {name,surname,email,password} = req.body;
        let users = loadUsers();
        let newUser = {
            id : users.length > 0 ? users[users.length - 1].id + 1 : 1,
            name : name.trim(),
            surname : surname.trim(),
            email : email.trim(),
            password,
            avatar : null
        }
        let usersModify = [...users, newUser];
    
            storeUsers(usersModify);
    
            return res.redirect('/main/login');
    }
 

}