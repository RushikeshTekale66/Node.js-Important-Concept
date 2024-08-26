const express = require("express");
const app = express();
const port = 5000;

//Middle ware
const middle = (req, res, next)=>{
    // If route contains login the go further
    if(req.query.login){
        console.log(req.query);
        next();
    }
    //else print error
    else{
        res.send("<h1>You are not login</h1>");
    }    
}

//Middleware using in app
app.use(middle);


//route level middleware
app.get("/", middle, (req, res)=>{
    res.send("<h1>Hi I am Home page");
})

app.listen(port, ()=>{
    console.log("Application is running on port", port);
    
})