const http = require('http');
const fs = require('fs');

// single page http server
/*
const server = http.createServer((req, res)=>{
  console.log("Server is live");
  res.end("Responce send by the server")
})
*/

// Multipage server
const server = http.createServer((req, res) => {
  // Created a log that can save the information about date & url ie req send by the user on that url
  const log = `${Date.now()} : ${req. url} New Req Received \n`;
  fs.appendFile("log.txt", log, (err, data) => {
    switch (req.url) {
      case ("/"):
        res.end("Homepage");
        break;
      case ("/about"):
        res.end("About");
        break;
      default:
        res.end("404 Not found");
    }
  })
})

server.listen(8000, ()=>console.log("Server started"));