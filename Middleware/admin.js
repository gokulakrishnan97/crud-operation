
function checkAdmin(req, res, next){
    let admin = req.user.isAdmin
    if(!admin){
        res.status(401).send('You are not able to access the application');
    }
    next();
}

module.exports = checkAdmin;