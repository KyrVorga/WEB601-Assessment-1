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
	try {
        // Get the token from the header.
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        // If there is no token, throw an error.
        if (token == null) throw new Error("No token found.");

        // Verify the token.
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
            if (err || !data) {
                throw new Error(
                    "Your credendials are currently not authorized."
                );
            } else {
               // 
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createToken,
    authuorizeToken
};