var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');

/* GET home page */
router.get('/', (req, res, next) => {
    Cube.find()
        .then((cubes) => {
            res.render('indexPage', {
                    user: req.user,
                    title: 'Browse Cubes',
                    cubes: cubes
                });
            //console.log("#########index.js cubes:", cubes);
        });
});

module.exports = router;
