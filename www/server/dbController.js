var app = require('./server.js');
var db = app.get('db');

module.exports= {
  addUser: function(req, res, next){
    var newUser = {
      user_name: req.body.user_name,
      password: req.body.password,
      email: req.body.email
    }

    db.add_user([newUser.user_name, newUser.password, newUser.email], function(err, users) {
      res.status(200).json(users);
    })
  },

  get: function(req, res, next){
    db.select_users(function(err, users){
      res.status(200).json(users);
    })
  }
}
