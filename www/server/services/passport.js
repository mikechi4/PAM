var passport = require('passport');
var LocalStrategy = require('passport-local')
	.Strategy;

  var bcrypt = require('bcryptjs');

  var app = require('./../server');
  var db = app.get('db');

  function verifyPassword(submitedPass, userPass) {
  	return bcrypt.compareSync(submitedPass, userPass);
  }

  passport.use(new LocalStrategy({
  	usernameField: 'email',
  	passwordField: 'password'
  }, function(email, password, done) {

  	db.users.findOne({email: email}, function(err, user) {

  		// If err, return err
  		if (err) {
        console.log("err", err);
        done(err);
      }

  		// If no user if found, return false
  		if (!user) {
        console.log("no user");
        return done(null, false);
      }

  		// If user is found, check to see if passwords match. If so, return user
  		if (verifyPassword(password, user.password)) {
        console.log("entering findOne", user);
        return done(null, user);
      }

  		// If no match, return false
  		return done(null, false);
  	});
  }));

  // Puts the user on the session
passport.serializeUser(function(user, done) {
  console.log("user serializeUser: ", user);
	done(null, user.user_id);
});
passport.deserializeUser(function(id, done) {
	db.users.findOne({user_id: id}, function(err, user) {
    console.log("user deserializeUser: ", user);
		done(err, user);
	});
});

module.exports = passport;
