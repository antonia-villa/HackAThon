var express = require("express");
var passport = require("../config/passportConfig");
var isLoggedIn = require('../middleware/isLoggedIn');
var db = require("../models");
var sequelize = require('sequelize')
var router = express.Router();
var dataCleanse = require('./dataCleanse.js')

//login get and post routes
router.get("/allBoards", isLoggedIn, function(req, res){
	var user = String(req.user.id)

	db.sequelize.query('SELECT * from userboards WHERE userid = :userid',
  { replacements: { userid: [user] }, type: sequelize.QueryTypes.SELECT }
  ).then(function(results){
		console.log('results', results)
		console.log('results at [0]', results[0])

		res.render("boards/allBoards", {results: results});

	});

});

router.get("/single/:id", isLoggedIn, function(req, res){
	var boardid = req.params.id

	db.sequelize.query('SELECT * FROM topictasks tt JOIN boardtopics bt  ON tt.topicid = bt.id JOIN userboards u ON bt.boardtopic = u.boardtopic where u.id = :boardid',
  { replacements: { boardid: [boardid] }, type: sequelize.QueryTypes.SELECT }
  ).then(function(results){
  		var data = dataCleanse.dataCleanse(results)
		console.log('results', results)

		res.render("boards/single", {results: data});

	});

})


module.exports = router;