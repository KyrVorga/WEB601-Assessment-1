//SETUP - Modules
const express = require('express')
const app = express()
const favicon = require('serve-favicon')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet');
const session = require('express-session')
const crypto = require('node:crypto')
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

// enable express-session and configure
let sess = {
    secret: 'cIjfgW1SvZkdxj0rC9ajCqBN1ULUM',
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: true
    },
    genid: function(req) {
      return crypto.randomUUID() // use UUIDs for session IDs
    }
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
    sess.cookie.secure = true
}

app.use(session(sess))

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

// make session user available to ejs
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
});

// middleware to test if authenticated
function isAuthenticated (req, res, next) {
    if (req.session.user) next()
    else next('route')
}

/* -------------------------------------------------------------------------- */
/*                             //SECTION - Routes                             */
/* -------------------------------------------------------------------------- */

// selected starting page / API endpoint to serve index
app.get('/', (req, res) => {
    res.render('about.ejs')
})

// links between pages / API endpoint to serve each page

app.get('/views/about.ejs', (req, res) => {
    res.render('about.ejs')
})

app.get('/views/login.ejs', (req, res) => {
    res.render('login.ejs')
})

app.get('/views/register.ejs', (req, res) => {
    res.render('register.ejs')
})

app.get('/views/profile.ejs', isAuthenticated, async (req, res) => {
    res.render('profile.ejs')
})

// register user endpoints
app.use("/api/user/", userRoute)

//ANCHOR - Server
// start server on port defined in .env

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})