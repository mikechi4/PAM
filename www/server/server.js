var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var middleware = require('./middleware.js');

//token stuff
var jwt = require('jsonwebtoken');


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

// app.get('/login', controller.getUser);
//token stuff
app.post('/auth', controller.getUser);

app.get('/home', controller.getTransactions);
app.get('/edit', controller.getTransactionsById);
app.post('/signUp', controller.addUser);
app.post('/transactions', controller.addTransaction);
app.put('/edit', controller.updateTransaction);

app.delete('/edit', controller.deleteTransaction);

app.listen(port, function () {
  console.log("now listening on port... " + port);
})


// =====================
// Local AUTH WITH SEMO
// =====================
// var express = require('express');
// var bodyParser = require('body-parser');
// var massive = require('massive');
// var middleware = require('./middleware.js');
// var session = require('express-session')
// // var cors = require('cors');
// // var corsOptions = {
// //   origin: '*',
// //   allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, X-Pls-Work',
// //   exposedHeaders: 'X-Pls-Work',
// //   preflightContinue: true
// // };
// // var methodOverride = require('method-override')
//
// // CONFIG //
// var config = require('./config');
// // var LocalStrategy = require('passport-local').Strategy;
//
// var app = module.exports = express();
//
// // app.use(methodOverride);
//
// // var allowCrossDomain = function(req, res, next) {
// //     res.header('Access-Control-Allow-Origin', '*');
// //     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
// //     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Pls-Work');
// //
// //     // intercept OPTIONS method
// //     if ('OPTIONS' == req.method) {
// //       res.sendStatus(200);
// //     }
// //     else {
// //       next();
// //     }
// // };
// // app.use(allowCrossDomain);
//
// // Connections //
// var massiveServer = massive.connectSync({
//   connectionString: "postgres://postgres:january17@localhost/PAM"
// });
//
// var port = config.PORT;
//
// app.set('db', massiveServer);
// var db = app.get('db');
// var controller = require('./dbController.js');
//
// // SERVICES //
// var passport = require('./services/passport');
//
// // POLICIES //
// var isAuthed = function(req, res, next) {
//   console.log("req.user isAuthed", req.user);
//   if (!req.isAuthenticated()) return res.status(401).send();
//   return next();
// };
//
// app.use(middleware.addHeaders);
// app.use(bodyParser.json());
// // app.use(cors(corsOptions));
// app.use(session({
//   secret: config.SESSION_SECRET,
//   saveUninitialized: true,
//   resave: false,
//   cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) }
// }));
//
// var passport = require('./services/passport');
//
// app.use(passport.initialize());
// app.use(passport.session());
//
// app.get('/login', controller.getUser);
// app.get('/home', controller.getTransactions);
// app.get('/edit', controller.getTransactionsById);
// app.post('/signUp', controller.addUser);
// app.post('/transactions', controller.addTransaction);
// app.put('/edit', controller.updateTransaction);
//
// app.post('/login', passport.authenticate('local'), function (req, res) {
//     console.log("req.user? ", req.user);
//     if (!req.user) return res.status(401).send('current user not defined');
//     delete req.user.password;
//     return res.send(req.user);
//   });
//
// // {
// //   successRedirect: '/me'
// // }
//
// app.get('/logout', function(req, res, next) {
//   req.logout();
//   return res.status(200).send('logged out');
// });
//
// app.get('/me', isAuthed, controller.me);
//
// app.delete('/edit', controller.deleteTransaction);
//
// app.listen(port, function () {
//   console.log("now listening on port... " + port);
// })
