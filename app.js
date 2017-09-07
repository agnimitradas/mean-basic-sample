var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookapi');

var Book = require('./models/bookModel');

var app = express();
var port = 7070;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//1. Router
app.get("/", function(req, res) {
    res.send('Hello World 1!');
});


//2.Router
var bookRouter = express.Router();

bookRouter.route('/books')
    .get(function(req, res) {
        // var responseJson = { msg: "Hello World 2!" };
        // res.json(responseJson);
        var query = req.query;
        Book.find(query, function(err, books) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.json(books);
            }
        })
    })

.post(function(req, res) {
    var book = new Book(req.body);
    console.log("req.body", req.body);
    console.log("New Post");
    console.log("book", book);
    book.save();
    res.send(book);
});



bookRouter.route('/books/:bookid')
    .get(function(req, res) {
        Book.findById(req.params.bookid, function(err, books) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.json(books);
            }
        })
    });

app.use('/api', bookRouter);


app.listen(port, function() {
    console.log('Running on port no:' + port);
});