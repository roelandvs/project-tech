const express = require('express')
const app = express()
const port = 3000

//link to the static file directory
app.use('/static', express.static('static'))

//homepage that uses an html file
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

//contact page that just contains text
app.get('/contact', (req, res) => res.send('This is the contact page!'))

//about page that just contains text
app.get('/about', (req, res) => res.send('This is the about page!'));


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))