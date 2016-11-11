var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var middleware = require('./middleware.js');
var config = require('./config.js')
//token stuff
var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt')
var cors = require('cors');
var port = 3000;

var app = module.exports = express();

var massiveServer = massive.connectSync({
  connectionString: "postgres://postgres:january17@localhost/PAM"
});

app.use(cors());
app.use(expressJWT({secret: config.secret}).unless({path: ['/signUp','/auth/login']}));
app.use(bodyParser.json());
app.set('db', massiveServer);
var db = app.get('db');
var controller = require('./dbController.js');
app.get('/home/budget', controller.getBudget);
app.get('/home', controller.getTransactions);
app.get('/edit', controller.getTransactionsById);
app.get('/auth/me', controller.checkToken);

app.post('/auth/login', controller.getUser);
app.post('/signUp', controller.addUser);
app.post('/transactions', controller.addTransaction);

app.put('/edit', controller.updateTransaction);
app.put('/home/goal', controller.updateBudget);

app.delete('/edit', controller.deleteTransaction);

app.listen(port, function () {
  console.log("now listening on port... " + port);
})
