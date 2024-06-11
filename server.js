const express = require("express");
const cluster = require("cluster");
const os = require("os");

// Count to cpus
const totalCPUs = os.cpus().length;

if(cluster.isPrimary){
    for(let i=0; i<totalCPUs; i++){
        // Distribute the load to all the clusters
        cluster.fork();
    }
}else{
    const app = express();
    const port = 5000;

    app.get("/", (req, res)=>{
        return res.json({msg:`Hellow from exress server ${process.pid}`})
    })

    app.listen(port, ()=>console.log("Application is running on ", port));
}