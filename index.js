require('dotenv').config();
var bodyParser = require('body-parser');
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var passport = require('./config/passportConfig');
var session = require('express-session');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
})

app.get('/', function(req, res){
	// Set as res.send first to test link
	//res.send('home page coming soon!');
	// Change to res.render when home page is set up
	res.render('home');
});

app.get('/profile', isLoggedIn, function(req,res){
	res.render('profile');
});

app.use('/auth', require('./controllers/auth'));
app.use('/boards', require('./controllers/board'));

app.listen(3000 || process.env.PORT);