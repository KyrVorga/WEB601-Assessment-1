const express = require("express");
// const {read, save} = require('../helpers/save_load.js')
const fs = require("fs");

require('dotenv').config()

const app = express();

app.post('/register', async (req, res, next) => {
    let jsonData = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));
    try {
        const { username, name, email, password } = req.body;

        // Check if the username or email already exists in the database
        console.log(jsonData['users']);
        if (!Object.hasOwn(jsonData['users'], username)) {
            jsonData['users'][username] = {
                "name": name,
                "email": email,
                "password": password, // should be hashed ideally
            }
            // Respond with a success message
            res.status(201).json({
                message: 'User registration successful.',
            });
        } else {
            res.status(501).json({
                message: 'User registration unsuccessful. User already exists.',
            });
        }
    
        } catch (error) {
        // If there's an error, respond with an error message
        res.status(500).json({ error: 'User registration failed. Please try again.' });
        }
        finally {
            fs.writeFileSync('./data/data.json', JSON.stringify(jsonData, null, 2))
            // save('./data/data.json', jsonData)
        }
    }
);

  
module.exports = app;