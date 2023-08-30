//SETUP - Modules
const express = require('express')
const app = express()
const favicon = require('serve-favicon')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet');
require("dotenv").config();

const port = process.env.PORT;

const userRoute = require("./src/routes/user")

//SETUP - Middleware
// Apply content security policies and establish CORS
app.use(cors())
app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'cdnjs.cloudflare.com',],
      scriptSrc: ["'self'", 'code.jquery.com', 'maxcdn.bootstrapcdn.com', 'cdn.jsdelivr.net', 'use.fontawesome.com', 'cdn.startbootstrap.com'],
      styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com', 'cdn.jsdelivr.net', 'cdnjs.cloudflare.com'],
      fontSrc: ["'self'", 'fonts.gstatic.com', 'cdnjs.cloudflare.com']
    }
   }));

// setting template engine with ejs
app.set('view engine', 'ejs')

// Returns a middleware to serve favicon
app.use(favicon(path.join(__dirname, 'public', 'assets', 'favicon.ico')))

// Serve static files
app.use(express.static('public'))
app.use(express.static('app'))

// Parse requests of content-type - application/json
app.use(express.json());

// Middleware access to every domain
app.use(bodyParser.urlencoded({extended: true}))


/* -------------------------------------------------------------------------- */
/*                             //SECTION - Routes                             */
/* -------------------------------------------------------------------------- */

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

app.get('/views/login.ejs', (req, res) => {
    res.render('login.ejs')
})

// register user endpoints
app.use("/api/user/", userRoute)


//ANCHOR - Server
// start server on port defined in .env
app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})