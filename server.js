const http = require("http");

http.createServer(function(req, res){
    res.writeHead(200, {'content-type':'text/plain'});
    res.end("Hellow world");
}).listen(3000);