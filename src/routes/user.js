//SETUP - Modules
const express = require("express");
const fs = require("fs");

const { createToken } = require('../../bin/auth_jwt')
const app = express();
const jwt = require('jsonwebtoken');


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

                // regenerate the session, which is good practice to help
                // guard against forms of session fixation
                req.session.regenerate(function (err) {
                    if (err) next(err)

                    // store user information in session, typically a user id
                    req.session.user = jsonData['users'][username.toLowerCase()]
                    req.session.user.username = username
                    req.session.token = accessToken

                    // save the session before redirection to ensure page
                    // load does not happen before session is saved
                    req.session.save(function (err) {
                        if (err) return next(err)
                        res.status(200).send({
                            message: 'User login successful.'
                        })
                    })
                })    
            }
        } else {
            // Otherwise user doesn't exist.
            return res.status(404).json({
                error: "User login unsuccessful. User doesn't exist.",
            });
        }
    
        } catch (error) {
            // If there's an error, respond with an error message
            return res.status(400).json({ error: "Something went wrong. Please try again. "});
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


                // regenerate the session, which is good practice to help
                // guard against forms of session fixation
                req.session.regenerate(function (err) {
                    if (err) next(err)

                    // store user information in session, typically a user id
                    req.session.user = jsonData['users'][username.toLowerCase()]
                    req.session.user.username = username
                    req.session.token = accessToken

                    console.log(req.session, req.session.user)
                    // save the session before redirection to ensure page
                    // load does not happen before session is saved
                    req.session.save(function (err) {
                        if (err) return next(err)
                        res.status(200).send({
                            message: 'User registration successful.'
                        })
                    })
                })     
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


/* -------------------------------------------------------------------------- */
/*                         //SECTION - Update user                         */
/* -------------------------------------------------------------------------- */
app.put('/update/:username', async (req, res, next) => {
    try {
        let jsonData = await JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
        const token = req.session.token

        if (token != null) {
            // Verify the token.
            jwt.verify(token, process.env.API_SECRET, (err, data) => {
                if (err || !data) {
                    return res.status(400).json({
                        message: 'Your credentials are currently not authorized.', 
                    });
                }
            });
        } else {
            return res.status(400).json({
                message: 'Your credentials are currently not authorized.',
            });
        }

        // update users password
        const username = req.params.username;
        jsonData['users'][username.toLowerCase()]['password'] = req.body.password;

        // Save changes to data file
        fs.writeFileSync('./data/data.json', JSON.stringify(jsonData, null, 2));

        res.status(200).send({
            message: 'User password changed successfully.'
        })

    } catch (error) {
        // If there's an error, respond with an error message
        return res.status(500).send({ error: 'Something went wrong. Please try again.' });
    }
});


//!SECTION


/* -------------------------------------------------------------------------- */
/*                           //SECTION - Delete user                          */
/* -------------------------------------------------------------------------- */
app.delete('/delete/:username', async (req, res, next) => {
    try {
        let jsonData = await JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
        const token = req.session.token
        console.log(req.session, req.session.user)
        if (token != null) {
            // Verify the token.
            jwt.verify(token, process.env.API_SECRET, (err, data) => {
                if (err || !data) {
                    return res.status(400).json({
                        message: 'Your credentials are currently not authorized.',
                    });
                }
            });
        } 
        else {
            return res.status(400).json({
                message: 'Your credentials are currently not authorized.',
            });
        }

        //console.log(jsonData);
        // Delete user functionality (Works but throws err on else statement above)
        const username = req.params.username;
        delete jsonData['users'][username.toLowerCase()];

        // Save changes to data file
        fs.writeFileSync('./data/data.json', JSON.stringify(jsonData, null, 2));

        req.session.user = null
        req.session.user = token
        req.session.save(function (err) {
            if (err) next(err)

            // regenerate the session, which is good practice to help
            // guard against forms of session fixation
            req.session.regenerate(function (err) {
                if (err) next(err)
                res.status(200).send({
                    message: 'User deleted successfully.'
                })
            })
        })
    } catch (error) {
        // If there's an error, respond with an error message
        return res.status(500).send({ error: 'Something went wrong. Please try again.' });
    }
});


//!SECTION

/* -------------------------------------------------------------------------- */
/*                             //SECTION - Logout                             */
/* -------------------------------------------------------------------------- */

app.get('/logout/', async (req, res, next) => {
    try {
        const token = req.session.token

        if (token != null) {
            // Verify the token.
            jwt.verify(token, process.env.API_SECRET, (err, data) => {
                if (err || !data) {
                    return res.status(400).json({
                        message: 'Your credentials are currently not authorized.',
                    });
                }
            });
        } 
        else {
            return res.status(400).json({
                message: 'Your credentials are currently not authorized.',
            });
        }

        req.session.user = null
        req.session.user = token
        req.session.save(function (err) {
            if (err) next(err)

            // regenerate the session, which is good practice to help
            // guard against forms of session fixation
            req.session.regenerate(function (err) {
                if (err) next(err)
                res.status(200).send({
                    message: 'Logout successful.'
                })
            })
        })

    } catch (error) {
        // If there's an error, respond with an error message
        return res.status(500).send({ error: 'Something went wrong. Please try again.' });
    }
});
//!SECTION


module.exports = app;