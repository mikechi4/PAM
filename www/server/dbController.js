var app = require('./server.js');
var db = app.get('db');
var jwt = require('jsonwebtoken');
var config = require('./config.js')
// BCRYPT
var bcrypt = require('bcryptjs');
// HASH PASSWORD //
function hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}

module.exports= {
    addUser: function(req, res, next){
      var newUser = {
        password: hashPassword(req.body.password),
        email: req.body.email
      }

      db.add_user([newUser.password, newUser.email], function(err, users) {
        if (err) {
          return res.send(err);
        }
        delete users.password;
        res.status(200).json(users);
      })
    },

  getUser: function(req, res, next) {
    var user = {
      email: req.body.email,
      password: req.body.password
    }
    // console.log('the user ' + user + 'user.email ' + user.email + 'user.password ' + user.password);

    db.get_user([req.body.email], function(err, user){
      if (err) throw err;

      if (!user[0]) {
        console.log('hit with no user');
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {

        // check if password matches
        if (user[0].password != req.body.password) {
          console.log('hit with wrong password');
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        }
        else {
          console.log('DINGDINGDINGDINGDINGDINGDING');
          // if user is found and password is right
          // create a token
          jwt.sign(user[0], config.secret, {
            expiresIn: 1440 // expires in 24 hours
          }, function(err, token){
            res.status(200).json({
              token: token,
              msg: 'ok',
              user: req.body.email
            })
          })
        }
      }

    })


//     db.run('select * from users where email LIKE $1', [user.email], function(err, res){
// console.log("iam email" + req.body.email);
//
//         return user.email;
//       // // console.log('user inside findONe ' + ' email ' + req.body.email);
//       // if (err) throw err;
//       //
//       // if (!user) {
//       //   res.json({ success: false, message: 'Authentication failed. User not found.' });
//       // } else if (user) {
//       //
//       //   // check if password matches
//       //   if (user.password != req.body.password) {
//       //
//       //     res.json({ success: false, message: 'Authentication failed. Wrong password.' });
//       //   }
//       // }
//       // else {
//       //   // if user is found and password is right
//       //   // create a token
//       //   var token = jwt.sign(user, app.get('secret'), {
//       //     expiresIn: 1440 // expires in 24 hours
//       //   });
//       //   // console.log("AAAAAAAAAAAAAAAAAA"+token);
//       //
//       //
//       //   // return the information including token as JSON
//       //   res.status(200).json({
//       //     success: true,
//       //     message: 'Enjoy your token!',
//       //     token: token
//       //   })
//       // }
//
//     })

  },

  getTransactions: function(req, res, next){
    db.get_transactions(function(err, users){
      res.status(200).json(users);
    })
  },

  getTransactionsById: function(req, res, next){
    var t_id = req.query.id;
    db.get_transactions_by_t_id([t_id],function(err, transactions) {
      res.status(200).json(transactions);
    })
  },

  deleteTransaction: function(req, res, next) {
    var t_id = req.query.id;
    db.delete_transaction([t_id], function(err, transaction){
      res.status(200).end();
    })
  },

  addTransaction: function(req, res, next) {
    var newTransaction = {
      amount: req.body.amount,
      category: req.body.category,
      purchase_date: req.body.purchase_date,
      user_id: 21,
      name: req.body.name
    }

    db.insert_transaction([newTransaction.amount, newTransaction.category, newTransaction.purchase_date, newTransaction.name]
    ,function(err, users) {
      res.status(200).json(users);
    })
  },

  updateTransaction: function(req, res, next){
    var editTransaction = {
      transaction_id: req.body.transaction_id,
      amount: req.body.amount,
      category: req.body.category,
      purchase_date: req.body.purchaseDate,
      name: req.body.name
    }

    db.update_transaction([editTransaction.amount, editTransaction.category, editTransaction.purchase_date, editTransaction.name, editTransaction.transaction_id]
    ,function(err, users){
      res.status(200).end();
    })
  }
}





// WORK WITH SEEEEEMo
// var app = require('./server.js');
// var db = app.get('db');
//
// // BCRYPT
// var bcrypt = require('bcryptjs');
// // HASH PASSWORD //
// function hashPassword(password) {
//     var salt = bcrypt.genSaltSync(10);
//     var hash = bcrypt.hashSync(password, salt);
//     return hash;
// }
//
// module.exports= {
//   addUser: function(req, res, next){
//     var newUser = {
//       password: hashPassword(req.body.password),
//       email: req.body.email
//     }
//
//     db.add_user([newUser.password, newUser.email], function(err, users) {
//       if (err) {
//         return res.send(err);
//       }
//       delete users.password;
//       res.status(200).json(users);
//     })
//   },
//
//   getUser: function(req, res, next){
//     db.check_user([req.query.password, req.query.username], function(err, users){
//       res.status(200).json(users);
//     })
//   },
//
//   me: function(req, res, next) {
//     console.log("req.user /me: ", req.user);
//     if (!req.user) return res.status(401).send('current user not defined');
//     delete req.user.password;
//     return res.status(200).json(req.user);
//   },
//
//   getTransactions: function(req, res, next){
//     db.get_transactions(function(err, users){
//       res.status(200).json(users);
//     })
//   },
//
//   getTransactionsById: function(req, res, next){
//     var t_id = req.query.id;
//     db.get_transactions_by_t_id([t_id],function(err, transactions) {
//       res.status(200).json(transactions);
//     })
//   },
//
//   deleteTransaction: function(req, res, next) {
//     var t_id = req.query.id;
//     db.delete_transaction([t_id], function(err, transaction){
//       res.status(200).end();
//     })
//   },
//
//   addTransaction: function(req, res, next) {
//     var newTransaction = {
//       amount: req.body.amount,
//       category: req.body.category,
//       purchase_date: req.body.purchase_date,
//       user_id: 21,
//       name: req.body.name
//     }
//
//     db.insert_transaction([newTransaction.amount, newTransaction.category, newTransaction.purchase_date, newTransaction.name]
//     ,function(err, users) {
//       res.status(200).json(users);
//     })
//   },
//
//   updateTransaction: function(req, res, next){
//     var editTransaction = {
//       transaction_id: req.body.transaction_id,
//       amount: req.body.amount,
//       category: req.body.category,
//       purchase_date: req.body.purchaseDate,
//       name: req.body.name
//     }
//
//     db.update_transaction([editTransaction.amount, editTransaction.category, editTransaction.purchase_date, editTransaction.name, editTransaction.transaction_id]
//     ,function(err, users){
//       res.status(200).end();
//     })
//   }
// }
