// Load the http module to create an http server.
var express = require('express');

var app = express();

app.use('/', express.static(__dirname));

app.listen(8080, function() {
    console.log('Server started...');
});

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
