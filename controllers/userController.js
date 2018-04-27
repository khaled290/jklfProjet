const User = require('../models/User');

exports.getUsers = (req, res) => {
    console.log('depuis userController.getUsers');

    const title = "les utilisateurs";
    myUsers = [];
    User.find((err, users) => {
        if(err) {
            console.log('could not retrieve movies from DB');
            res.sendStatus(500);
        } else {
            myUsers = users;
            res.render('all-users', { title: title, users: myUsers});
        }
    });
}

exports.postUser = (req, res) => {
    console.log(req.body);
    
    if (!req.body) {
        return res.sendStatus(500);
    } else {
        const data = req.body; 
        console.log('form data: ', data);
        
        const name = data.name;
        const lastName = data.lastName;
        const email = data.email;
        const pwd = data.pwd;

        const myUser = new User({
            name: name,
            lastName: lastName,
            email: email,
            pwd: pwd,
        })
        myUser.save((err, saveUser) => {
            if(err) {
                console.error(err);
                return;
            } else {
                console.log("User save !!" + saveUser);
            }
        });
        
        res.sendStatus(201);
    }  
};

exports.getUserDetails = (req, res) => {
    const id = req.params.id;
    User.findById(id, (err, user) => {
        console.log('user-details', user);
        res.render('user-details.ejs', { title:"Detail User", user: user});
    })
};