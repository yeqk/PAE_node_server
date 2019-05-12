const mongoose = require('mongoose');

var db;

module.exports = function Connection() {
    
    if (!db) {
        db = mongoose.connect('mongodb://localhost/pae', {
            useNewUrlParser: true
        })
    }
    return db;
}
