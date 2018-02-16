var express = require("express");
var passport = require("../config/passportConfig");
var isLoggedIn = require('../middleware/isLoggedIn');
var db = require("../models");
var sequelize = require('sequelize')
var router = express.Router();

//login get and post routes
router.get("/allBoards", isLoggedIn, function(req, res){
	var user = String(req.user.id)
	console.log(typeof user)
	console.log('userId', user)

	db.sequelize.query('SELECT * from userboards WHERE userid = :userid',
  { replacements: { userid: [user] }, type: sequelize.QueryTypes.SELECT }
  ).then(function(results){
		console.log(results)
		res.render("boards/allBoards", {results: results});

});

// 	db.sequelize.query('SELECT * from userboards WHERE userid = 1'
//   ).then(function(results){
// 		console.log(results)
// 		res.render("boards/allBoards", {results: results});

// });

});


module.exports = router;