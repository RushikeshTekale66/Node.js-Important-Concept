const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.resolve("./Public")));

app.get("/", (req, res)=>{
    return res.sendFile("/Public/index.html");
})

app.listen(9000, ()=>{
    console.log("Server Started");
});