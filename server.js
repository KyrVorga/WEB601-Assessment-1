// import modules
const express = require('express')
const app = express()
const cors = require("cors");
const favicon = require('serve-favicon');
const path = require('path');
const port = 3000

// setting template engine with ejs
app.set('view engine', 'ejs')

// middleware access to every domain
app.use(cors());

// Returns a middleware to serve favicon - not working / crashing site
// app.use(favicon(path.join(__dirname, 'public', 'asset', 'favicon.ico')))

// making the public folder public
app.use(express.static(path.join(__dirname, 'public')))

// parse requests of content-type - application/json
app.use(express.json());


// selected starting page / API endpoint to serve index
app.get('/', (req, res) => {
    res.render('index.ejs')
})
// links between pages / API endpoint to serve each page
app.get('/views/index.ejs', (req, res) => {
    res.render('index.ejs')
})
app.get('/views/post.ejs', (req, res) => {
    res.render('post.ejs')
})
app.get('/views/about.ejs', (req, res) => {
    res.render('about.ejs')
})
app.get('/views/contact.ejs', (req, res) => {
    res.render('contact.ejs')
})


// start server
app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})