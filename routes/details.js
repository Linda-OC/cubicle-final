var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');


/* GET details page for selected cube. */
router.get('/:uid', function (req, res, next) {
    let id = req.params.uid;
    console.log("details.js this is id:", id);

    Cube.findOne({ _id: id }).populate('accessories').populate('creator')
        .then((thisCube) => {
            console.log("detail.js thisCube = ", thisCube);

            let isCreator = false;
            console.log('detail.js thisCube ', '' + thisCube._doc.creator._doc._id);

            if (req.user != undefined) {
                isCreator = ((''+thisCube._doc.creator._doc._id) == ('' +req.user._id));
                console.log('detail.js user id ', '' + req.user._id);
                console.log('detail.js isCreator', isCreator);
            }
            res.render('detailsPage', {
                title: "Details",
                cube: thisCube,
                accessories: thisCube.accessories,
                isCreator: isCreator,
                user: req.user
            });
        });
});

module.exports = router;