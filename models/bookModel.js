var mongoose = require('mongoose');

var bookModel = mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    read: {
        type: Boolean,
        // default: false
    }
});

module.exports = mongoose.model('Book', bookModel);