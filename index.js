const express = require('express')
const ejs = require('ejs')
const app = express()
const bodyParser = require('body-parser')
const slug = require('slug')
const port = 3000
const mongo = require('mongodb')
const session = require('express-session')
const { ObjectID } = require('mongodb');
const multer  = require('multer')
require('dotenv').config()

var db = null;
const url = process.env.MONGO_URL;

mongo.MongoClient.connect(url, function(err, client) { //connecting to mongodb. Inside package mongo there's a MongoClient with function connect.
  if (err) {
  	throw err;
  }	else {
    console.log('Database connectie werkt :)');
  }
  db = client.db(process.env.DB_NAME);
})

var profileData = {age: 20, study: 'CMD'};
var hobbies = ['sporten', 'gamen', 'express gebruiken'];
var upload = multer({ dest: 'static/uploads/' })
// var currentUser; // comments voor een vraag tijdens beoordeling

app
	.set('view engine', 'ejs') //making ejs the view engine of express
	.use('/static', express.static('static')) //link to the static file directory
	.use(bodyParser.urlencoded({extended: true})) //enables to get data through post request
	.use(session({
		resave: false,
	    saveUninitialized: true,
	    secret: process.env.SESSION_PW
	}))

	//pages of feature
	.get('/', homePage) //homepage that uses an html file
	.get('/register', (req, res) => res.render('register'))
	.post('/register', upload.single('profilePicture'), registerData)
	.get('/description-page', seeDescription)
	.post('/description-page', updateDescription)
	.get('/account-preview', seeAccount)
	.post('/account-preview', deleteAccount)

	//pages of practice
	.get('/contact', (req, res) => res.send('This is the contact page!')) //contact page that just contains text
	.get('/about', (req, res) => res.send('This is the about page!')) //about page that just contains text
	.get('/mp3', (req, res) => res.sendFile(__dirname + '/static/tunes/cant-stop.mp3')) //send a mp3 file if the user goes to /mp3
	.get('/account/:id', (req, res) => res.send('Your account number is: ' + '<h2>' + req.params.id + '</h2>'))
	.get('/fonts', (req, res) => res.sendFile(__dirname + '/static/fonts/proxima_nova_light.ttf')) //link to font, not usefull
	.get('/profile/:name', dynamicProfile) //shows dynamic profile

function homePage(req, res) {
	res.render('links')
}

// storing inputs in req.session and in database
function registerData(req, res) { 
	req.session.user = {
		name: req.body.firstName,
		email: req.body.email,
		birthday: req.body.birthday,
		gender: req.body.gender,
		preference: req.body.preference,
		picture: req.file,
		description: req.body.description
	}

	db.collection('profileInfo').insertOne(req.session.user, check)

	function check(err, data) {
		if (err) {
			next(err);
		} else {
			res.redirect('/description-page')
		}
	}
}

//finding and showing description of user in their session
async function seeDescription(req, res) { //async function because promise (user_id) was pending
	let currentUser = await db.collection('profileInfo').findOne({"_id": mongo.ObjectID(req.session.user._id)}) //stored globally for re-use
	res.render('description-page', {description: currentUser.description})
}

//updating the description of the profile
function updateDescription(req, res) {
	db.collection('profileInfo').updateOne({
		"_id": mongo.ObjectID(req.session.user._id)},
		{$set: 
			{description: req.body.description}
		}
	, check)

	function check(err, data) {
		if (err) {
			next(err);
		} else {
			res.redirect('/account-preview')
		}
	}
}

function deleteAccount(req, res) {
	db.collection('profileInfo').deleteOne({
		"_id": mongo.ObjectID(req.session.user._id)
	}, check)

	function check(err, data) {
		if (err) {
			next(err);
		} else {
			res.redirect('/register')
		}
	}
}

async function seeAccount(req, res) {
	// res.render('account-preview', {account: currentUser) //waarom werkt dit niet?
	res.render('account-preview', {account: await db.collection('profileInfo').findOne({"_id": mongo.ObjectID(req.session.user._id)})})
}

function dynamicProfile(req, res) {
	res.render('profile', {person: req.params.name, data: profileData, hobbies: hobbies})//renders profile.ejs
}

app.use(function (req, res, next) {
  res.status(404).send('<h1>Sorry, niet deze pagina bestaat niet vriend</h1>') //handles 404 pages
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))