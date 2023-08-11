// import modules
const express = require('express')
const app = express()
const favicon = require('serve-favicon')
const path = require('path')
require("dotenv").config();
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet');
const port = process.env.PORT;
const userRoute = require("./routes/user")

app.use(cors())
app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'code.jquery.com', 'maxcdn.bootstrapcdn.com', 'cdn.jsdelivr.net', 'use.fontawesome.com', 'ff.kis.v2.scr.kaspersky-labs.com', 'cdn.startbootstrap.com'],
      styleSrc: ["'self'", 'fonts.googleapis.com', 'cdn.jsdelivr.net'],
      fontSrc: ["'self'", 'fonts.gstatic.com']
    }
   }));

// setting template engine with ejs
app.set('view engine', 'ejs')

// Returns a middleware to serve favicon - not working / crashing site
app.use(favicon(path.join(__dirname, 'public', 'assets', 'favicon.ico')))

// making the public folder public
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))

// parse requests of content-type - application/json
app.use(express.json());

// middleware access to every domain
app.use(bodyParser.urlencoded({extended: true}))

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

app.use("/api/user/", userRoute)

// $.getScript('routs', function () {          
//     ;  
// }); 

// app.post('/login', (req, res) => {
//     // Insert Login Code Here
    
// })

// start server
app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})