var express = require("express");
var passport = require("../config/passportConfig");
var db = require("../models");
var router = express.Router();

//login get and post routes
router.get("/login", function(req, res){
	res.render("auth/login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/profile",
	successFlash: "Login Successful",
	failureRedirect: "/auth/login",
	failureFlash: "invalid credentials"
}));

//signup get and post routes
router.get("/signup", function(req, res){
	res.render("auth/signup");
})

router.post("/signup", function(req, res, next){
	console.log("req.body is", req.body);
	db.user.findOrCreate({
		where: {email: req.body.email},
		defaults: {
			username: req.body.username,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			password: req.body.password
		}
	}).spread(function(user, wasCreated){
		if(wasCreated){
			//good job.  you nailed it without duplication
			passport.authenticate("local", {
				successRedirect: "/profile",
				successFlash: "logged in with success"
			})(req, res, next);
		}
		else {
			//you blew it, you should login not, signup
			req.flash("error", "Email already exists");
			res.redirect("/auth/login");
		}
	}).catch(function(err){
		req.flash("error", err.message);
		res.redirect("/auth/signup");
	});
});

router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "logged out!");
	res.redirect("/");
})

//*************************************
// NEW Code for Facebook OAUTH
//*************************************
// Calls the passport-facebook strategy (located in the passport config)
router.get("/facebook", passport.authenticate('facebook',{
	scope: ['public_profile', 'email']
}));

// Handle the response from Facebook (logic located in passport config)
router.get('/callback/facebook', passport.authenticate('facebook', {
	successRedirect: '/profile', 
	successFlash: 'You successfully logged in via Facebook',
	failureRedirect: '/auth/login',
	failureFlash: 'You tried to login with FB, but FB dont like you'
}))

module.exports = router;