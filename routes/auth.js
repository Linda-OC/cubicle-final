var express = require('express');
var router = express.Router();
const passport = require('passport');

//auth login
router.get('/login', (req, res) => {
    res.render('loginPage', { 
        user:req.user
    });
});

//auth logout
router.get('/logout', (req, res) => {
    //handle with passport login
    req.logout();
    res.redirect('/');
});

//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));


//callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    //res.send(req.user);
    res.redirect('/profile/');
    // res.render('profilePage');
});


module.exports = router;