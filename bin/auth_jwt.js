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

const authuorizeToken = () => {
    return function (req, res, next) {
        try {
            //Get token from req.body
            const token = req.body.token

            // If there is no token, throw an error.
            if (token == null) {
                res.status(400).json({
                    message: 'No token found.',
                });
            }

            // Verify the token.
            jwt.verify(token, process.env.API_SECRET, (err, data) => {
                if (err || !data) {
                    res.status(400).json({
                        message: 'Your credendials are currently not authorized.',
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

module.exports = {
    createToken,
    authuorizeToken
};