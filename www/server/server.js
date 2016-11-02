var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var middleware = require('./middleware.js');
// var cors = require('cors');
// var corsOptions = {
//   origin: 'http://localhost:3000'
// };
var port = 3000;

var app = module.exports = express();

var massiveServer = massive.connectSync({
  connectionString: "postgres://postgres:january17@localhost/PAM"
});

app.use(middleware.addHeaders);
app.use(bodyParser.json());
// app.use(cors(corsOptions));
app.set('db', massiveServer);
var db = app.get('db');
var controller = require('./dbController.js');

app.get('/login', controller.getUser);
// remove after checking
app.get('/home', controller.getTransactions);
app.post('/signUp', controller.addUser);
app.post('/transactions', controller.addTransaction);

app.listen(port, function () {
  console.log("now listening on port... " + port);
})
