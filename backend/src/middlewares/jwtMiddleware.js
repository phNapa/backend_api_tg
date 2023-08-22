const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT= (req, res, next) => {
    const token = req.headers['authorization'];
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,decoded) => {
        if(err) return res.status(401).end();

        req.userID = decoded.userID;
        next();
    })
}

module.exports ={
    verifyJWT,
};