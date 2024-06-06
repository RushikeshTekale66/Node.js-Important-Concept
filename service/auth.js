const jwt = require("jsonwebtoken");
const secret = "Rushi1234"

function setUser(user){
    // Authentication
    return jwt.sign(
        {
            _id:user._id,
            email:user.email,
            role:user.role,
        },
        secret
    );
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token, secret);
}

module.exports = {
    setUser,
    getUser
}