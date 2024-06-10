const express = require("express");
const fs = require("fs");
const status = require("express-status-monitor");
// creating the zip file
const zlib = require("zlib");

const app = express();
const port = 5000;

app.use(status());

// reading stream (text.txt) --> making the zip file of it --> writing the zip into stream
fs.createReadStream("./text.txt").pipe(zlib.createGzip().pipe(fs.createWriteStream("./text.zip")));


app.get("/", (req, res)=>{
  const stream = fs.createReadStream("./text.txt", "utf-8");
  stream.on('data', (chunk)=>res.write(chunk));
  // end the responce after reading the data
  stream.on('end', ()=>res.end());
})

app.listen(port, ()=>console.log("Application is live on ", port))