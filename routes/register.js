var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET register page */
router.get('/', function (req, res, next) {
    res.render('registerPage', {
        title: 'Register'
    });
});

/*POST new User */
router.post('/', function (req, res, next) {
    console.log("incoming form submission", req.body); //to show info from form

    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
    });

    newUser.save()
        .then((result) => {
            res.redirect('/');
            console.log('*****register.js newUser.save result', result);
        });
});

module.exports = router;