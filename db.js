const mongoose = require('mongoose');
// Database URL
const url = "mongodb://127.0.0.1:27017/PracticeMongoDB";

// Connect Node.js to database
mongoose.connect(url).then(()=>console.log("Connected to database")).catch((e)=>console.log("Error occure",e))

const userSchema = new mongoose.Schema({
  name:String,
  rollno:Number
})
// create collection named infos
const userModel = mongoose.model("info", userSchema);

module.exports =  userModel;