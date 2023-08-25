const express = require("express");
const fs = require("fs");
const { authuorizeToken } = require('../../bin/auth_jwt');
const app = express();

app.post('/', authuorizeToken(), async (req, res, next) => {
    // let jsonData = await JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
    try {

        // log for testing
        console.log(req.body);

        } catch (error) {
        // If there's an error, respond with an error message
            console.log(error)
            res.status(400).json({ error: 'Something went wrong. Please try again.' });
        }
        finally {
            // uncomment this out if changes are made to the data,
            // e.g., user login status to prevent multiple sessions.

            // fs.writeFileSync('./data/data.json', JSON.stringify(jsonData, null, 2))
        }
    }
);

module.exports = app;