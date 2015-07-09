var express = require('express');
var serveStatic = require('serve-static');

var app = express();

app.use(express.static(__dirname + "/dest"));

app.listen(3000);
