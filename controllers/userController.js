const User = require('../models/User');
const bcrypt = require("bcrypt");
form = require('express-form'),
field = form.field;
expressSession = require('express-session');

exports.getUsers = (req, res) => {
    console.log('depuis userController.getUsers');

    const title = "les utilisateurs";
    myUser = [];
    User.find((err, users) => {
        if(err) {
            console.log('could not retrieve movies from DB');
            res.sendStatus(500);
        } else {
            myUser = users;
            res.render('all-users', { title: title, users: myUser});
        }
    });
}

exports.forms = form(
    field("name").trim().required().is(/^[a-zA-Zéè îïç-]+$/),
    field("lastName").trim().required().is(/^[a-zA-Zéè îïç-]+$/),
    field("password").trim().required(),
    field("email").trim().isEmail()
   )
exports.postUser = (req, res) => {
    console.log(req.body);
    
    if (!req.body) {
        return res.sendStatus(500);
    } else {
        const data = req.body; 
        console.log('form data: ', data);
        console.log(req.form);
        
        const name = data.name;
        const lastName = data.lastName;
        const email = data.email;
        var pwd = bcrypt.hashSync(data.pwd, 10);
    
        const myUser = new User({
            name: name,
            lastName: lastName,
            email: email,
            pwd: pwd,
        })
        
        User.findOne({email : data.email}, function(err, user){
            console.log('------------------------------------');
            console.log("****** : " + user);
            console.log('------------------------------------');
            if(user) {
                console.log('------------------------------------');
                console.log("invalide");
                console.log('------------------------------------');
                res.status(401).json({ error: 'message' });
         
            }else{
                console.log('------------------------------------');
                console.log("Valide");
                console.log('------------------------------------');
                myUser.save((err, saveUser) => {
                    if(err) {
                        console.error(err);
                        return;
                    } else {
                        console.log("User save !!" + saveUser);
                    }
                }); 
            }
           // res.sendStatus(401);
           // res.render("login", { error: "cette email existe deja"});
        });
        
         
        
       // res.sendStatus(201);
    }  
};

exports.getUserDetails = (req, res) => {
    const id = req.params.id;
    User.findById(id, (err, user) => {
        console.log('user-details', user);
        res.render('user-details.ejs', { title:"Detail User", user: user});
    })
};
exports.formsLogin = form(
    field("password").trim().required(),
    field("email").trim().isEmail()
);

exports.postLoginAuth = (req, res) => {
 //   console.log(req.body);
    
    if (!req.body) {
        return res.sendStatus(500);
    } else {
        const data = req.body; 
        console.log('form data: ', data);
        
        const email = data.email;
        var pwd = bcrypt.hashSync(data.pwd, 10);
    
        if(req.form.isValid) {  
            User.findOne({email : email, pwd : pwd}, function(err, user){
                if (err) return res.status(500).send(err)
                console.log('------------------------------------');
                console.log("*****************" + user);
                console.log('------------------------------------');
                if (user) {
                    console.log('------------------------------------');
                    console.log("Valide");
                    console.log('------------------------------------');
                    req.session.user = "222";
                    res.status(200);
                    //req.session.auth = user.id;
                }else{
                    console.log('------------------------------------');
                    console.log("invalide");
                    console.log('------------------------------------');
                    res.status(401).json({ error: 'message' });
            
                }
                    
            });
        }
    }  

    
}

exports.userDelete = (req, res) => {
    User.findOneAndRemove({_id : req.params.id}, (err) => {
        return res.redirect("/login");
    })
}