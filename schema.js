var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    term : {
        type: String,
        required: true
    },
    definition : {
        type: String,
        required: true
    },
    examples : 
    [{
        type: String
    }]
   
});
