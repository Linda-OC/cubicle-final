var express = require('express');
var router = express.Router();
const Accessory = require('../models/accessory');

/*GET createAccessory page */
router.get('/', function (req, res, next) {
    res.render('createAccessoryPage', {
        title: 'Create Accessory',
        user: req.user
    });
});
/*POST new Accessory */
router.post('/', function (req, res, next) {
    console.log("incoming form submission", req.body);

    const newAccessory = new Accessory({
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        cubes: [],
    });

    let validationErrors = newAccessory.validateSync();
    //console.log(validationErrors);
    //console.log(Object.values(validationErrors.errors));

    if (validationErrors === undefined) {
        //save the cube, no errors, render screen without errors
        newAccessory.save()
            .then((response) => {
                res.redirect('/');
            });
    } else {
        //not valid, render screen with error messages
        let values = Object.values(validationErrors.errors);
        console.log('~Validation Errors:');
        values.forEach(err => { //console log
            console.log('create.js err.properties.path= ', err.properties.path);
            console.log('create.js err.properties.message = ', err.properties.message);
            console.log('');
        });

        let displayErrors = values.map((err) => err.properties.path.charAt(0).toUpperCase() + err.properties.path.slice(1) + " " + err.properties.message);
        res.render('createAccessoryPage', {
            title: 'Create Accessory',
            errors: displayErrors,
            user: req.user
        });
    }
});

module.exports = router;


