const express = require("express");
const fs = require("fs");
const { createToken } = require('../../bin/auth_jwt')
const app = express();

app.post('/login', async (req, res, next) => {
    let jsonData = await JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
    try {
        const { username, password } = req.body;
        // Check if the username or email already exists in the database
        if (Object.hasOwn(jsonData['users'], username.toLowerCase())) {
            if (jsonData['users'][username.toLowerCase()].password == String(password)) {
                const accessToken = createToken(username.toLowerCase());
                
                res.status(201).json({
                    message: 'User login successful.',
                    token: accessToken
                });
            }
            // Respond with a success message
            // probably also return a token or something
        } else {
            res.status(400).json({
                error: 'User login unsuccessful. User doesn\'t exists.',
            });
        }
    
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

app.post('/register', async (req, res, next) => {
    let jsonData = JSON.parse(fs.readFileSync('/data/data.json', 'utf8'));
    try {
        const { username, password } = req.body;

        // Check if the username or email already exists in the database
        if (!Object.hasOwn(jsonData['users'], username)) {
            jsonData['users'][username] = {
                "password": password, // should be hashed ideally
            }
            
            // Respond with a success message
            res.status(201).send({
                message: 'User registration successful.',
            });
        } else {
            res.status(400).send({
                error: 'User registration unsuccessful. User already exists.',
            });
        }
    
        } catch (error) {
        // If there's an error, respond with an error message
        res.status(400).send({ error: 'User registration failed. Please try again.' });
        }
        finally {
            fs.writeFileSync('./data/data.json', JSON.stringify(jsonData, null, 2))
        }
    }
);

module.exports = app;