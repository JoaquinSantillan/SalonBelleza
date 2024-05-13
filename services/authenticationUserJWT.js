const generateJWT = require("./generateJWT");


function authenticationsUserJWT(req,res,next)
{
    const token = generateJWT(req.body.username);
    res.json({ token });
}

module.exports = authenticationsUserJWT