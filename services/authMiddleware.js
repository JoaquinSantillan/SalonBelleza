const jwt = require('jsonwebtoken')

function authenticationUser(req,res,next)
{
    const authHeader = req.headers['authorization'];
  
    if (!authHeader) {
      return res.sendStatus(401); 
    }

    const token = authHeader && authHeader.split(' ')[1];

    if(token == null)
        {
            return res.status(401).json({authMessage:"usuario no auth por favor inicie sesion"})
        }
    
    jwt.verify(token,'token_secret',(err,user)=>
        {
            if(err)
                {
                    return res.status(403)
                }
            req.user = user;
            next();
        })
    
}

module.exports = authenticationUser;