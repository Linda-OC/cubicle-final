var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');



/* GET profile page */
router.get('/', (req, res) => {
   // res.send('You are logged in, here is your profile' + req.user);
    Cube.find()
        .then((cubes) => {
            res.render('profilePage', {
                user: req.user.username,
                title: 'Cubes',
                cubes: cubes
            });
            //console.log("#########index.js cubes:", cubes);
        });
//     console.log('******profile.js RES: ', res);
//     console.log('******profile.js req.url: ', req.url);
// });
    // ;

});


module.exports = router;