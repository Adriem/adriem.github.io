/** Entry point for the application */
var express = require('express');
var morgan  = require('morgan');

var app  = express();
var port = process.env.port || 8082;

app.use(express.static(__dirname + '/public/dist')); // Set the static files location
app.use(morgan('dev'));

app.get('*', function(req, res){
    res.sendfile('./public/dist/index.html');
});

app.listen(port);
console.log("Agnostic Bookmarks listening on port " + port + "!");