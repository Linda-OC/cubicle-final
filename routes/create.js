var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');
const User = require('../models/user');


/*GET create page */
router.get('/', function (req, res, next) {
    res.render('createPage', {
        title: 'Create',
        user: req.user
    });
});

/*POST new Cube */
router.post('/', function (req, res, next) {
    console.log("incoming form submission", req.body);//to show info from form

    const cube = new Cube({
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficulty: req.body.difficultyLevel,
        accessories: [],
        creator: req.user._id
    });

    let validationErrors = cube.validateSync();
     //console.log(validationErrors);
     //console.log(Object.values(validationErrors.errors));

    if (validationErrors === undefined) {
        //save the cube, no errors, render screen without errors
        cube.save()
            .then((response) => {
                User.findOneAndUpdate(
                    { _id: req.user._id },
                    { $push: { "cubes": response._id } },
                    { upsert: true },
                    function (err) {
                        if (err) console.log(err);
                    }
                );
                res.redirect('/');
            });
    } else {
        //not valid, render screen with error messages
        let values = Object.values(validationErrors.errors);
        console.log('~Validation Errors:');
        values.forEach(err => { //console log
            console.log('create.js err.properties.path= ', err.properties.path);
            console.log('create.js err.properties.message = ',err.properties.message);
            console.log('');
        });

        let displayErrors = values.map((err) => err.properties.path.charAt(0).toUpperCase() + err.properties.path.slice(1) + " " + err.properties.message);
        res.render('createPage', {
            title: 'Create Cube',
            errors: displayErrors,
            user: req.user
        });
    }
});

module.exports = router;