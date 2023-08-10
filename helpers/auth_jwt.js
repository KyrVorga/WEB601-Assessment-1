const jwt = require("jsonwebtoken");
require("dotenv").config();

// this function takes an object that contains a user and a role string, and uses those to generate the token.
const createToken = (username) => {
	// create a token using the user and access token
	let token = jwt.sign(
        {
            username:username
        },
        process.env.API_SECRET, 
        {
		    expiresIn: process.env.TOKEN_EXPIRY,
	    }
    );
	return token;
};

const authuorizeToken = (user) => {
	// create a token using the user and access token
	let token = jwt.sign(
        user,
        process.env.API_SECRET, 
        {
		    expiresIn: '1d'//process.env.TOKEN_EXPIRY,
	    }
    );
	return token;
};

module.exports = {
    createToken,
    authuorizeToken
};