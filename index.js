const User = require('./db');

const updatedata = async()=>{
  // Update first occurance of the document
  let result = await User.updateOne(
    {rollno:1}, //filter
    {rollno:10} //update
  )
  console.log(result);

  // Update many document
  let result2 = await User.updateMany(
    {rollno:10}, //filter
    {$set : {name:"Rushi Tekale", rollno:100}} //update
  )
  console.log(result2);
}

updatedata();