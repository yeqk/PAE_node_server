module.exports = function() {
    var db = require('../libs/db-connection')();
    var mongoose = require('mongoose');
    var Wifi = mongoose.Schema({
        ssid: String,
        password: String,
        longitude: Number,
        latitude: Number
    });
    return mongoose.model('wifi',Wifi);
};