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
        password: req.body.password,
        email: req.body.email
      }
      db.users.findOne({email:req.body.email}, function(err, user){
        if(err) throw err;
        if(!newUser.password || newUser.password.length < 6){
            res.status(409).send({success: false, message: 'Password must be at least six characters'});
        } else if (user){
          res.status(409).send({success: false, message: 'Username already exists'});
        } else {
          db.add_user([newUser.password, newUser.email], function(err, users) {
            if (err) {
              return res.send(err);
            }
            delete users.password;
            res.status(200).json(users);
          })
        }
      })

    },

  getUser:  function(req, res, next) {

    db.users.findOne({email:req.body.email}, function(err, user){
      if (err) throw err;
      console.log('USER!! ' + req.body.email);
      if (!user) {
        console.log('hit with no user');
        res.status(401).send({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {

        // check if password matches

        if (req.body.password != user.password) {
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
              user: req.body.email,
              id: user.user_id
            })
          })
        }
      }

    })
  },

  checkToken: function(req, res, next){
      var token = req.get('Authorization');
      console.log('token ' + token);
      jwt.verify(token, config.secret, (err, decoded) => {
          console.log('error '+  err);
          console.log('DEEECODED!! ' + decoded);
          if (err) return res.status(401).send(err);
          return res.status(200).json(decoded)
      })
  },

  getTransactions: function(req, res, next){
    var id = req.query.user_id;
    db.get_transactions([id], function(err, users){
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
    // var t_id = req.query.id;
    db.transactions.destroy({transaction_id: req.query.id}, function(err, transaction){
      console.log(err);
      res.status(200).end();
    })
  },

  addTransaction: function(req, res, next) {

    var newTransaction = {
      amount: req.body.amount,
      category: req.body.category,
      purchase_date: req.body.purchase_date,
      user_id: req.body.user_id,
      name: req.body.name
    }

    db.insert_transaction([newTransaction.amount, newTransaction.category, newTransaction.purchase_date, newTransaction.user_id, newTransaction.name]
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

      res.status(200).json(users);
    })
  },

  getBudget: function(req, res, next) {
    db.get_goal([req.query.id],function(err, budget) {
    res.status(200).json(budget);
    })
  },

  updateBudget: function(req,res,next) {
    //find if user's transaction exists in DB yet
    console.log('user id in updateBudget ' + req.body.user_id);
    db.budget.find({user_id: req.body.user_id}, function(err, user){
      //if a user is found, update their budget
      if(user.length > 0){
        db.budget.update({budget_id: req.body.spendId, budget_amt: req.body.spendGoal}, function(err, budget) {
          res.status(200).json(budget);
        })
        //user not found. insert a fresh budget
      } else if(user.length == 0){
        db.budget.insert({user_id: req.body.user_id, budget_amt: req.body.spendGoal }, function(err, budget){
          res.status(200).json(budget)
        })
      }
    })
  }
}
