const express = require('express')
const ejs = require('ejs')
const camelCase = require('camelcase') // moet ik nog gebruiken
const app = express()
const port = 3000

app
	.set('view engine', 'ejs') //making ejs the view engine of express
	.use('/static', express.static('static')) //link to the static file directory

	.get('/', homePage) //homepage that uses an html file

function homePage(req, res) {
	res.render('index')//renders profile.ejs
}

app.use(function (req, res, next) {
  res.status(404).send('<h1>Sorry, niet deze pagina bestaat niet vriend</h1>') //handles 404 pages
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// var profileData = {age: 20, study: 'CMD'}
// var hobbies = ['sporten', 'gamen', 'express gebruiken']

// app
// 	.set('view engine', 'ejs') //making ejs the view engine of express
// 	.use('/static', express.static('static')) //link to the static file directory

// 	.get('/', (req, res) => res.sendFile(__dirname + '/static/index.html')) //homepage that uses an html file
// 	.get('/contact', (req, res) => res.send('This is the contact page!')) //contact page that just contains text
// 	.get('/about', (req, res) => res.send('This is the about page!')) //about page that just contains text
// 	.get('/mp3', (req, res) => res.sendFile(__dirname + '/static/tunes/cant-stop.mp3')) //send a mp3 file if the user goes to /mp3
// 	.get('/account/:id', (req, res) => res.send('Your account number is: ' + '<h2>' + req.params.id + '</h2>' + '<p>Change the number by adding a number to the end of \"http://localhost:3000/account/\"</p>'))
// 	.get('/fonts', (req, res) => res.sendFile(__dirname + '/static/fonts/proxima_nova_light.ttf')) //link to font, not usefull
// 	.get('/profile/:name', dynamicProfile);//shows dynamic profile

// function dynamicProfile(req, res) {
// 	res.render('profile', {person: req.params.name, data: profileData, hobbies: hobbies})//renders profile.ejs
// }

// app.use(function (req, res, next) {
//   res.status(404).send('<h1>Sorry, niet deze pagina bestaat niet vriend</h1>') //handles 404 pages
// })

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))