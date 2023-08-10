const express = require("express");
// const {read, save} = require('../helpers/save_load.js')
const fs = require("fs");

const app = express();

app.post('/register', async (req, res, next) => {
    let jsonData = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));
    try {
        const { username, password } = req.body;

        // Check if the username or email already exists in the database
        if (!Object.hasOwn(jsonData['users'], username)) {
            jsonData['users'][username] = {
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
        }
    }
);

app.post('/login', async (req, res, next) => {
    let jsonData = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));
    try {
        const { username, password } = req.body;

        // Check if the username or email already exists in the database
        if (Object.hasOwn(jsonData['users'], username)) {
            if (jsonData['users'][username].password == password) {
                // do the login stuff
            }
            // Respond with a success message
            // probably also return a token or something
            res.status(201).json({
                message: 'User login successful.',
            });
        } else {
            res.status(501).json({
                message: 'User login unsuccessful. User doesn\'t exists.',
            });
        }
    
        } catch (error) {
        // If there's an error, respond with an error message
        res.status(500).json({ error: 'User login failed. Please try again.' });
        }
        finally {
            // uncomment this out if changes are made to the data,
            // e.g., user login status to prevent multiple sessions.

            // fs.writeFileSync('./data/data.json', JSON.stringify(jsonData, null, 2))
        }
    }
);

module.exports = app;