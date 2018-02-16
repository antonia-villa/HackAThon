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

	db.sequelize.query('SELECT distinct username from users WHERE id = :userid',
  { replacements: { userid: [user] }, type: sequelize.QueryTypes.SELECT }
  ).then(function(results){
  	var username = results[0].username
  	
  	if (username === 'admin'){
  				db.sequelize.query('SELECT distinct bt.boardtopic, bt.topicdesc, tt.taskdesc, COUNT(DISTINCT CASE WHEN tt.prioritydesc = :p1 THEN tt.userid END) as low, COUNT(DISTINCT CASE WHEN tt.prioritydesc = :p2 THEN tt.userid END) as med, COUNT(DISTINCT CASE WHEN tt.prioritydesc = :p3 THEN tt.userid END) as high FROM topictasks tt JOIN boardtopics bt ON tt.topicid = bt.id JOIN userboards ub ON bt.boardtopic = ub.boardtopic GROUP BY bt.boardtopic,  bt.topicdesc, tt.taskdesc, tt.prioritydesc ORDER BY boardtopic, topicdesc, taskdesc',   { replacements: { p1: 'low', p2:'med', p3:'high' }, type: sequelize.QueryTypes.SELECT }).then(function(results){
				console.log('results from admin', results)
				res.render("boards/adminBoard")
		});

  	} else {

		db.sequelize.query('SELECT * from userboards WHERE userid = :userid',
	  { replacements: { userid: [user] }, type: sequelize.QueryTypes.SELECT }
	  ).then(function(results){
			console.log('results', results)
			res.render("boards/allBoards", {results: results});
	});
 }

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