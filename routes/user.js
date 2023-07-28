const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config()


const uri = process.env.MONGODB_URI;  

const User = require("../models/user");

const app = express();

app.post('/register', async (req, res, next) => {
    try {
        
        // console.log('API Reached!')

        // Extract the user data from the request body
        const { username, email, password } = req.body;
    
        // initialize the connection to the database
        await mongoose.connect(uri);

        // Check if the username or email already exists in the database
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already in use. Please choose a different username or email.' });
        }
    
        // Hash and salt the password before saving it in the database
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new User object using the User model
        const newUser = new User({
            username,
            email,
            password: hashedPassword, // Store the hashed password in the database
        });
  
        // Save the new user to the database
        await newUser.save();
    
        // Respond with a success message
        res.status(201).json({
            message: 'User registration successful.',
        });
        } catch (error) {
        // If there's an error, respond with an error message
        res.status(500).json({ error: 'User registration failed. Please try again.' });
        }
        finally {
            await mongoose.connection.close()
        }
    }
);

  
module.exports = app;