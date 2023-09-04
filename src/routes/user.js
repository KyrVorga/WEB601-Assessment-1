//SETUP - Modules
const express = require("express");
const fs = require("fs");

const { createToken, authuorizeToken } = require('../../bin/auth_jwt')
const app = express();


/* -------------------------------------------------------------------------- */
/*                              //SECTION - Login                             */
/* -------------------------------------------------------------------------- */
app.post('/login', async (req, res, next) => {
    try {
        // load the json data file
        let jsonData = await JSON.parse(fs.readFileSync('data/data.json', 'utf8'));

        const { username, password } = req.body;

        // Check if the username exists in the data file
        if (Object.hasOwn(jsonData['users'], username.toLowerCase())) {
            // Check the password provided matches the one stored
            if (jsonData['users'][username.toLowerCase()].password == String(password)) {
                // Create a new JWT
                const accessToken = createToken(username.toLowerCase());
                
                // Send back the JWT
                return res.status(201).json({
                    message: 'User login successful.',
                    token: accessToken
                });
            }
        } else {
            // Otherwise user doesn't exist.
            return res.status(400).json({
                error: 'User login unsuccessful. User doesn\'t exists.',
            });
        }
    
        } catch (error) {
        // If there's an error, respond with an error message
            console.log(error)
            return res.status(400).json({ error: 'Something went wrong. Please try again.' });
        }
    }
);
//!SECTION


/* -------------------------------------------------------------------------- */
/*                            //SECTION - Register                            */
/* -------------------------------------------------------------------------- */
app.post('/register', async (req, res, next) => {
    try {
        // load the json data file
        let jsonData = await JSON.parse(fs.readFileSync('data/data.json', 'utf8'));

        const { username, password, name, email } = req.body;

        // Check if the username or email already exists in the database
        if (!Object.hasOwn(jsonData['users'], username.toLowerCase())) {
            jsonData['users'][username.toLowerCase()] = {
                name: name,
                email: email,
                password: password, // should be hashed ideally
            }

            // Save changes to datafile
            fs.writeFileSync('./data/data.json', JSON.stringify(jsonData, null, 2))
            
            // Create a new JWT
            const accessToken = createToken(username.toLowerCase());

            // Respond with a success message
            return res.status(201).send({
                message: 'User registration successful.',
                token: accessToken
            });
        } else {
            // if user already exists return an error message
            return res.status(400).send({
                error: 'User registration unsuccessful. User already exists.',
            });
        }
    } catch (error) {
    // If there's an error, respond with an error message
        return res.status(400).send({ error: 'User registration failed. Please try again.' });
    }
});
//!SECTION

module.exports = app;