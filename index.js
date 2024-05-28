const express = require('express');
const User = require("./MOCK_DATA.json")

const app = express();

app.get("/getuser", (req, res)=>{
  // setting header
  res.setHeader("myName", "Rushikeshtekale")
  let result = User;
  // Setting the http status code to che the responce of request
  res.status(200).json(result);
})

app.listen(5000, ()=>{console.log("App is live");})