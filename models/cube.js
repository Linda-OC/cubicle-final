const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Accessory = require('./accessory');
const User = require('./user');

const cubeSchema = new Schema({
    name: { //at least 5 characters
        type: String,
        required: [true, 'is required'],
        minLength: [5, 'must be at least 5 characters'],             
        validate: {
            validator: function (v) {
                return /^[\w][\w\s]*[\w]$/.test(v);
            },
            message: `must be only letters/numbers/spaces and not start or end with a space!`

        },
    },
    description: { //20 character limit
        type: String,
        required: [true, 'is required'],
        minLength: [20, 'must be at least 20 characters']
        
    },
    imageUrl: { //must start with http or https
        type: String,
        required: [true, 'is required'],
        validate: {
            validator: function (v) {
                return /^https?:\/\/\X*/.test(v);
            },
            //message: props => `${props.value} is not a valid url!
            message: `must start with 'http://' or 'https://'!`
        },
    },

    difficulty: Number,

    accessories: [{
        type: Schema.Types.ObjectId,
        ref: 'Accessory'
    }],

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Cube = mongoose.model('Cube', cubeSchema);
module.exports = Cube;