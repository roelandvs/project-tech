const express = require('express')
const ejs = require('ejs')
const camelCase = require('camelcase') // moet ik nogsteeds gebruiken
const app = express()
const bodyParser = require('body-parser')
const slug = require('slug')
const port = 3000
const mongo = require('mongodb')
require('dotenv').config()

var profileData = {age: 20, study: 'CMD'};
var hobbies = ['sporten', 'gamen', 'express gebruiken'];
var accountInfo;

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

app
	.set('view engine', 'ejs') //making ejs the view engine of express
	.use('/static', express.static('static')) //link to the static file directory
	.use(bodyParser.urlencoded({extended: true})) //enables to get data through post request

	.get('/', homePage) //homepage that uses an html file
	.get('/register', (req, res) => res.render('register'))
	.get('/register-two', (req, res) => res.render('register-two'))
	.get('/account-preview', seeAccount)
	.post('/account-preview', registerData)

	.get('/contact', (req, res) => res.send('This is the contact page!')) //contact page that just contains text
	.get('/about', (req, res) => res.send('This is the about page!')) //about page that just contains text
	.get('/mp3', (req, res) => res.sendFile(__dirname + '/static/tunes/cant-stop.mp3')) //send a mp3 file if the user goes to /mp3
	.get('/account/:id', (req, res) => res.send('Your account number is: ' + '<h2>' + req.params.id + '</h2>'))
	.get('/fonts', (req, res) => res.sendFile(__dirname + '/static/fonts/proxima_nova_light.ttf')) //link to font, not usefull
	.get('/profile/:name', dynamicProfile) //shows dynamic profile


function homePage(req, res) {
	res.render('links')
}

// function registerData(req, res) {
// 	res.render('account-preview')

// 	accountInfo = {
// 		name: req.body.firstName,
// 		email: req.body.email,
// 		birthday: req.body.birthday,
// 		gender: req.body.gender,
// 		preference: req.body.preference
// 	}

// 	res.redirect('/account-preview')
// }

function registerData(req, res) {
	db.collection('profileInfo').insertOne({
		name: req.body.firstName,
		email: req.body.email,
		birthday: req.body.birthday,
		gender: req.body.gender,
		preference: req.body.preference
	}, check)

	function check(err, data) {
		if (err) {
			next(err);
		} else {
			res.redirect('/account-preview')
		}

	}
}

function seeAccount(req, res) {
	res.render('account-preview', {account: accountInfo})
}

function dynamicProfile(req, res) {
	res.render('profile', {person: req.params.name, data: profileData, hobbies: hobbies})//renders profile.ejs
}

app.use(function (req, res, next) {
  res.status(404).send('<h1>Sorry, niet deze pagina bestaat niet vriend</h1>') //handles 404 pages
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))