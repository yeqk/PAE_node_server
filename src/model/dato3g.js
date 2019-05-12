module.exports = function() {
    var db = require('../libs/db-connection')();
    var mongoose = require('mongoose');
    var Dato3g = mongoose.Schema({
        description: String,
        longitude: Number,
        latitude: Number
    });
    return mongoose.model('dato3g',Dato3g);
};