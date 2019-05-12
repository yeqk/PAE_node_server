module.exports = function() {
    var db = require('../libs/db-connection')();
    var mongoose = require('mongoose');
    var Dato2g = mongoose.Schema({
        description: String,
        longitude: Number,
        latitude: Number
    });
    return mongoose.model('dato2g',Dato2g);
};