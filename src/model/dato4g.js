module.exports = function() {
    var db = require('../libs/db-connection')();
    var mongoose = require('mongoose');
    var Dato4g = mongoose.Schema({
        description: String,
        longitude: Number,
        latitude: Number
    });
    return mongoose.model('dato4g',Dato4g);
};