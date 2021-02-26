var express = require('express');
var router = express.Router();
const passport = require('passport');



/*GET login page */
// router.get('/', function (req, res, next) {
//     res.render('loginPage', {
//         title: 'Login'
//     });
//     console.log('#########login.js res:', res);
// });

// callback route for google to redirect to
// router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
//     res.send('you reached the callback URI');
// });

module.exports = router;
