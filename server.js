const express = require("express");
const fs = require("fs");
// Status monitor to check the status of express application
const status = require("express-status-monitor");

const app = express();
const port = 5000;

app.use(status());

app.get("/", (req, res)=>{
    // Reagular file reading

    // let data = fs.readFileSync("text.txt", "utf-8");  //Regular file reading
    // res.write(data);

    // File reading through stream
    const stream = fs.createReadStream("text.txt", "utf-8");
    stream.on("data", (chunk)=>res.write(chunk));
    stream.on("end", ()=>res.end());   
})

app.listen(port, ()=>console.log("Application is running on port", port)
)