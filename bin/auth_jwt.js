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


/* -------------------------------------------------------------------------- */
/*                         //SECTION - authuorizeToken                        */
/* -------------------------------------------------------------------------- */
/**
 * Authorisation middleware. Allows endpoints that use this middleware to 
 * continue only if the user is authorised.
 * @returns A middleware function to register
 */
const authuorizeToken = () => {
    return function (req, res, next) {
        try {
            //Get token from req.body
            const token = req.body.token

            // If there is no token, throw an error.
            if (token == null) {
                return res.status(400).json({
                    message: 'No token found.',
                });
            }

            // Verify the token.
            jwt.verify(token, process.env.API_SECRET, (err, data) => {
                if (err || !data) {
                    return res.status(400).json({
                        message: 'Your credentials are currently not authorized.',
                    });
                } else {
                    next()
                }
            });
        } catch (error) {
            next(error);
        }
    }
};
//!SECTION

module.exports = {
    createToken,
    authuorizeToken
};