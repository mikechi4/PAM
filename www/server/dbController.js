var app = require('./server.js');
var db = app.get('db');

module.exports= {
  addUser: function(req, res, next){
    var newUser = {
      password: req.body.password,
      email: req.body.email
    }

    db.add_user([newUser.password, newUser.email], function(err, users) {
      res.status(200).json(users);
    })
  },

  getUser: function(req, res, next){
    db.check_user([req.query.password, req.query.username], function(err, users){
      res.status(200).json(users);
    })
  },

  getTransactions: function(req, res, next){
    db.get_transactions(function(err, users){
      res.status(200).json(users);
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
  }
}
