/** Entry point for the application */
var express = require('express');
var morgan  = require('morgan');

var app  = express();
var port = process.env.port || 8082;

app.use(express.static('/public/dist'));
app.use(morgan('dev'));

app.get('*', function(req, res){
    res.sendFile(__dirname + '/public/dist/index.html');
});

app.listen(port);
console.log("Agnostic Bookmarks listening on port " + port + "!");