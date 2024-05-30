const mongoose = require('mongoose');

// Connection link

async function connectMongoDb(url){
    return mongoose.connect(url).then(()=>console.log("database connected")).catch((e)=>console.log("Error on connecting", e));
}

module.exports = {
    connectMongoDb
}