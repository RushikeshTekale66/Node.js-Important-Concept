const express = require('express');
const app = express();

app.get("/", (req, res)=>{
  res.send("I am home page");
})

app.get("/about", (req, res)=>{
  res.send("<h1>I am about page</h1>")
})

app.get("/contact", (req, res)=>{
  res.send("I am contact");
})

app.listen(8000, ()=>{console.log("Server is live");})