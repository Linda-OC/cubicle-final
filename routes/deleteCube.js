var express = require("express");
var router = express.Router();
const Cube = require("../models/cube");

/* GET details page for selected cube. */
router.get('/:uid', function (req, res, next) {
    let id = req.params.uid;

    Cube.findOne({_id: id }) 
        .then((thisCube) => {
            res.render('deleteCubePage', {
                title: 'Delete Cube',
                cube: thisCube,
                user: req.user,
                creator: thisCube.creator
            });
        });
});

/*DELETE*/
router.post("/:uid", function (req, res, next) {
    let selectedCubeId = req.params.uid;
    Cube.findOne({ _id: id })
    .then(async (thisCube) => {

        if (thisCube.creator.toString() != req.user._id.toString()) {
            return res.status(403).json({
                error: 'forbidden',
                message: 'You may not delete this cube.'
            });
        } else {
            await thisCube.findByIdAndDelete(selectedCubeId);
        }
        res.status(200).send("Cube deleted.");

    })
    .catch();
    // Cube.findOneAndDelete(
    //     { _id: selectedCubeId },
    //     err => { if (err) { console.log(err);}}
    // );
    res.redirect('/');
});

module.exports = router;