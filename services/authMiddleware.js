const jwt = require('jsonwebtoken')
require('dotenv').config();

function VerifyTokenAuth(req,res,next)
{

//controlar mensajes si no hay tokens
        const token = req.headers.authorization.split(' ')[1]

        const payload = jwt.verify(token,process.env.SECRET_TOKEN);

        if(Date.now > payload.exp)
            {
                res.status(401).json({tokenMessage:"token expired"});
            }
    req.user = payload
    next()
    
}

module.exports = VerifyTokenAuth;