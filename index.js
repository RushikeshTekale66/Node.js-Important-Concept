const express = require('express');
const User = require("./MOCK_DATA.json")

const app = express();

// Middle where 1
app.use((req, res, next)=>{
  // we also change the value of request
  req.name = "Rushikesh";
  console.log("Middle where 1", req.name);
  // next call the next function, if not next then result drop here
  next();
})

app.use((req, res, next)=>{
  // we access the request value anywhere
  console.log("Middle where 2", req.name);
  next()
})

app.get("/getuser", (req, res)=>{
  let result = User;
  console.log(req.name);
  res.json(result);
})

app.listen(5000, ()=>{console.log("App is live");})