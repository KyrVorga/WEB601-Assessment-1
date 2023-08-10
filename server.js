// import modules
const express = require('express')
const app = express()
const favicon = require('serve-favicon')
const path = require('path')
const port = 3000
const bodyParser = require('body-parser')

const userRoute = require("./routes/user")

// setting template engine with ejs
app.set('view engine', 'ejs')

// Returns a middleware to serve favicon - not working / crashing site
app.use(favicon(path.join(__dirname, 'public', 'assets', 'favicon.ico')))

// making the public folder public
app.use(express.static(path.join(__dirname, 'public')))

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