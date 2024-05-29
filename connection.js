const mongoose = require('mongoose');

// Connection link

async function connectMongoDb(url){
    return mongoose.connect(url).then(()=>console.log("database connected"))
}

module.exports = {
    connectMongoDb
}