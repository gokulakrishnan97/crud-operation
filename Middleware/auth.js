const jwt = require('jsonwebtoken');


function auth(req, res, next){
    let token = req.header('x-auth-token');
    if(!token) {
        res.status(401).send('Invalid Token..');
    }
    let decoded = jwt.verify(token, 'jwtprivatekey');
    req.user = decoded;
    next();
}

module.exports = auth;