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

/*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
// function ensureAuthenticated(req, res, next) {
//   if (!req.header('Authorization')) {
//     return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
//   }
//   var token = req.header('Authorization').split(' ')[1];
//
//   var payload = null;
//   try {
//     payload = jwt.decode(token, config.TOKEN_SECRET);
//   }
//   catch (err) {
//     return res.status(401).send({ message: err.message });
//   }
//
//   if (payload.exp <= moment().unix()) {
//     return res.status(401).send({ message: 'Token has expired' });
//   }
//   req.user = payload.sub;
//   next();
// }

/*
 |--------------------------------------------------------------------------
 | Log in with Email
 |--------------------------------------------------------------------------
 */
app.post('/auth/login', function(req, res) {


  db.users.findOne({email:req.body.email}, function(err, user){
    if (err) throw err;
    console.log('USER!! ' + user.email);
    if (!user) {
      console.log('hit with no user');
      res.status(401).send({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        console.log('hit with wrong password');
        res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.' });
      }
      else {
        console.log('DINGDINGDINGDINGDINGDINGDING');
        // if user is found and password is right
        // create a token
        jwt.sign(user, config.secret, {}, function(err, token){
          res.status(200).json({
            token: token,
            msg: 'ok',
            user: req.body.email
          })
        })
      }
    }

  })
});

// app.post('/auth/login', controller.getUser);

app.get('/home', controller.getTransactions);
app.get('/edit', controller.getTransactionsById);
app.post('/signUp', controller.addUser);
app.post('/transactions', controller.addTransaction);
app.put('/edit', controller.updateTransaction);

app.delete('/edit', controller.deleteTransaction);

app.listen(port, function () {
  console.log("now listening on port... " + port);
})

app.get('/auth/me', (req, res) => {
    const token = req.get('Authorization');
    console.log('token ' + token);
    jwt.verify(token, config.secret, (err, decoded) => {
        console.log('error '+  err);
        console.log('DEEECODED!! ' + decoded);
        if (err) return res.status(401).send(err);
        return res.status(200).json(decoded)
    })
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
