var express = require('express');
var router = express.Router();

/*GET about page */
router.get('/', function (req, res, next) {
    res.render('aboutPage', {
                title: 'About',
                user: req.user,
    });
});

module.exports = router;