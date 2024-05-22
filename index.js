const mongoose = require('mongoose');

// db can access the database which is connected
const db = mongoose.connection;

const dropCollectionDoc = async()=>{
  try{
    // drop the collection "infos"
    await db.dropCollection("infos");
    console.log("Collection deleted successfully");
  }
  catch(e){
    console.log("Error on droping ", e);
  }
}

dropCollectionDoc();