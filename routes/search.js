var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');

/* GET details page for selected cube. */
router.get('/', function (req, res, next) {
    let text = req.query.search;
    let from = req.query.from;
    let to = req.query.to;

    if (text == '' && from == '' && to == '') {
        res.redirect('/');
    } else {
        if (from == '' || from < 1) {
            from = 1;
        } else if (from > 6) {
            from = 6;
        }

        if (to == '' || to > 6 ) {
            to = 6;
        } else if (to < 1) {
            to = 1;
        }


        Cube.find({
            name: new RegExp(text, 'i'),
            difficulty: { $gte: from, $lte: to }
        })
            .then((thisCubes) => {
                res.render('searchPage', {
                    title: 'Search Results',
                    cube: thisCubes,
                    user: req.user
                });
            })
            .catch(err => console.log('Error', err));
    }
});

module.exports = router;