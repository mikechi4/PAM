var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var middleware = require('./middleware.js');
var config = require('./config.js')
//token stuff
var jwt = require('jsonwebtoken');


var cors = require('cors');
var port = 3000;

var app = module.exports = express();

var massiveServer = massive.connectSync({
  connectionString: "postgres://postgres:january17@localhost/PAM"
});

app.use(cors());
app.use(middleware.addHeaders);
app.use(bodyParser.json());
app.set('db', massiveServer);
var db = app.get('db');
var controller = require('./dbController.js');
app.get('/home/budget', controller.getBudget);
app.post('/auth/login', controller.getUser);
app.get('/home', controller.getTransactions);
app.get('/edit', controller.getTransactionsById);
app.post('/signUp', controller.addUser);
app.post('/transactions', controller.addTransaction);
app.put('/edit', controller.updateTransaction);

app.delete('/edit', controller.deleteTransaction);
app.get('/auth/me', controller.checkToken);
app.listen(port, function () {
  console.log("now listening on port... " + port);
})
