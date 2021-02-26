var express = require("express");
var router = express.Router();
const Cube = require("../models/cube");

/* GET details page for selected cube. */
router.get('/:uid', function (req, res, next) {
    let id = req.params.uid;

    Cube.findOne({ _id: id}).populate('accessories') //get access to all accessories attach to this cube
        .then((thisCube) => {
            res.render('editCubePage', {
                title: 'Edit Cube ',
                cube: thisCube,
                user: req.user,
                creator: thisCube.creator
            });
        });
});

/*UPDATE*/
router.post("/:uid", function (req, res, next) {
    let selectedCubeId = req.params.uid;

    Cube.findOneAndUpdate(
        { _id: selectedCubeId } ,
        {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            difficulty: req.body.difficultyLevel
        },
        { upsert: true },
        (err) => {
            if (err) {
                console.log(err);
            }
        }
    );

    res.redirect(`/details/${selectedCubeId}`);
});

module.exports = router;