const express = require("express");
const middle = require('./Middle');
const app = express();
const router = express.Router();
const port = 5000;

//Direct middle ware
app.get("/", middle, (req, res)=>{
    res.send("<h1>Hi I am Home page");
})

//middleware for multiple route
router.use(middle);

router.get("/about", (req, res)=>{
    res.send("<h1>I am About page</h1>")
})

router.get("/contact", (req, res)=>{
    res.send("<h1>I am contact page</h1>")
})

app.get("/profile", (req, res)=>{
    res.send("<h1>I am profile page</h1>");
})

//Route level Middleware
app.use("/", router);
app.listen(port, ()=>{
    console.log("Application is running on port", port);
    
})