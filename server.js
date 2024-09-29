const jwt = require("jsonwebtoken");

// Secret key for jwt
const secretkey = "Rushikesh";

//Data for jwt
let user= {
    name:"Rushikesh",
    lname:"Tekale"
}

// Creating the jwt token
const token = jwt.sign(user, secretkey);

console.log(token);
