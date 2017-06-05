var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    creator : {
        type: Number,
        required: true
    },
    options : [{ 
        option: {
            type: String,
            required: true
        },
        votes : {
            type: Number,
            required: true,
            default: 0
        }
    }],
    voters : [{
        type: Number // if voter isn't in this array, they can vote
    }]
});
/*
When you vote in any poll, the option you click will 
increment its 'votes' property by 1, and your ID you used
to log in will be logged in 'voters' array, to prevent you 
from voting more than once in any given poll;
*/
