const express = require('express')
const ejs = require('ejs')
const camelCase = require('camelcase') // moet ik nogsteeds gebruiken
const app = express()
const bodyParser = require('body-parser')
const slug = require('slug')
const port = 3000

var profileData = {age: 20, study: 'CMD'}
var hobbies = ['sporten', 'gamen', 'express gebruiken']
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app
	.set('view engine', 'ejs') //making ejs the view engine of express
	.use('/static', express.static('static')) //link to the static file directory
	// .use(bodyParser.urlencoded({extended: true})) //enables to get data through post request

	.get('/', homePage) //homepage that uses an html file
	.get('/register', (req, res) => res.render('register')) //renders dating feature page one
	.get('/register-two', (req, res) => res.render('register-two')) //renders dating feature page two
	.get('/account-preview', (req, res) => res.render('account-preview')) //renders dating feature page two
	.post('/register', urlencodedParser, registerData)

	.get('/contact', (req, res) => res.send('This is the contact page!')) //contact page that just contains text
	.get('/about', (req, res) => res.send('This is the about page!')) //about page that just contains text
	.get('/mp3', (req, res) => res.sendFile(__dirname + '/static/tunes/cant-stop.mp3')) //send a mp3 file if the user goes to /mp3
	.get('/account/:id', (req, res) => res.send('Your account number is: ' + '<h2>' + req.params.id + '</h2>'))
	.get('/fonts', (req, res) => res.sendFile(__dirname + '/static/fonts/proxima_nova_light.ttf')) //link to font, not usefull
	.get('/profile/:name', dynamicProfile) //shows dynamic profile

function homePage(req, res) {
	res.render('links') //renders links.ejs
}

function registerData(req, res) {
	// console.log(req.body)
	res.render('register')

	var account = [	
	]

	account.push({
		name: req.body.firstName,
		email: req.body.email
	})
}

function dynamicProfile(req, res) {
	res.render('profile', {person: req.params.name, data: profileData, hobbies: hobbies})//renders profile.ejs
}

app.use(function (req, res, next) {
  res.status(404).send('<h1>Sorry, niet deze pagina bestaat niet vriend</h1>') //handles 404 pages
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))