const express = require('express')
const app = express()
const cors = require("cors");
const port = 3000

app.set('view engine', 'ejs')
app.use(cors());

app.get('/', (req, res) => {
    res.render('index')
})

// start server
app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})

// parse requests of content-type - application/json
app.use(express.json());