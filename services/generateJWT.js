
const jwt = require("jsonwebtoken");

function generateJWT(username)
{

    return jwt.sign({
        username,
        exp:Date.now() + 3600 * 1000
    },process.env.SECRET_TOKEN)


}


module.exports = generateJWT;