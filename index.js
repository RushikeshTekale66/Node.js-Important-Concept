const User = require('./db');

const findManyData = async()=>{
  // sort the result in ascending or descending order.
  // for ascending order use 1 & for descending order use -1
  let result = await User.find({}).sort({name:-1}); 
  console.log(result);
}

findManyData();