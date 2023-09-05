//SETUP - Modules
const jwt = require("jsonwebtoken");
require("dotenv").config();


/* -------------------------------------------------------------------------- */
/*                           // SECTION - createToken                         */
/* -------------------------------------------------------------------------- */
/**
 * Takes an object that contains a user and a role string, and uses those to
 * generate the token.
 * @param {String} username - user's username to add to the payload
 * @returns A JSON Web Token
 */
const createToken = (username) => {
	// create a token using the user and api secret
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
//!SECTION


module.exports = {
    createToken
};