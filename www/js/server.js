var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

app.use(bodyParser.json());


app.listen(port, function () {
  console.log("now listening on port... " + port);
})
