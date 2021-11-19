const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    if(req.headers.token) {
        const token = req.headers.token.split(" ")[1];
        jwt.verify(token, process.env.JWT_KEY,(err,user)=>{
            if(err) return res.status(403).json("Token is invalid");
            req.user = user;    
            next();
        })
    } else {
        return res.status(403).json("You are not authenticated");
    }

}

function verifyTokenAndAuthorization(req, res, next){
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin) {
        
            next();
        }  
        else {
            return res.status(403).json("You are not allowed to do that !");
        }
    })
}

function verifyTokenAndIsAdmin(req, res, next) {
    verifyToken(req,res, ()=>{
        if(req.user.isAdmin) {
            next()
        }else {
            res.status(403).json("You are not allowed to do that!");
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndIsAdmin} ;