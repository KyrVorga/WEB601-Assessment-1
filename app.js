const express = require('express')
const app = express()
const port = 3000
const cors = require("cors");

app.set('view engine', 'ejs')
app.use(cors());

// start server
app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})

// parse requests of content-type - application/json
app.use(express.json());