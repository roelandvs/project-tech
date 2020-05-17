const express = require('express')
const ejs = require('ejs')
const camelCase = require('camelcase')
const app = express()
const port = 3000

var profileData = {age: 20, study: 'CMD'}
var hobbies = ['sporten', 'gamen', 'express gebruiken']

app
	.set('view engine', 'ejs') //making ejs the view engine of express
	.use('/static', express.static('static')) //link to the static file directory


//homepage that uses an html file
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

//contact page that just contains text
app.get('/contact', (req, res) => res.send('This is the contact page!'))

//about page that just contains text
app.get('/about', (req, res) => res.send('This is the about page!'));

//send a mp3 file if the user goes to /mp3
app.get('/mp3', (req, res) => res.sendFile(__dirname + '/static/tunes/cant-stop.mp3'))

//acces the id in the request object to show user wich id he is using. This id is dynamic, but not saved in any database
app.get('/account/:id', (req, res) => res.send('Your account number is: ' + '<h2>' + req.params.id + '</h2>' + '<p>Change the number by adding a number to the end of \"http://localhost:3000/account/\"</p>'));

//I was curious what would happen if I linked to a font
//spoiler: it downloads that font...
app.get('/fonts', (req, res) => res.sendFile(__dirname + '/static/fonts/proxima_nova_light.ttf'))

//you don't send ejs files, but render them
//express knows the files are in the views folder, and knows its a ejs file. So the path is just 'profile'
app.get('/profile/:name', (req, res) => {
	res.render('profile', {person: req.params.name, data: profileData, hobbies: hobbies})
})


//handles 404 pages
app.use(function (req, res, next) {
  res.status(404).send('<h1>Sorry, niet deze pagina bestaat niet vriend</h1>')
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))