var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    creator : {
        type: Number,
        required: true
    },
    term : {
        type: String,
        required: true
    },
    definition : {
        type: String,
        required: true
    },
    examples : [{
        example : {
            type: String,
            required: true
        }
    }]
   
});
