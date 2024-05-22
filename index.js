const User = require('./db');

const findManyData = async()=>{
  // limit(2) specify how much document to be return
  let result = await User.find({}).limit(1);
  console.log(result);
}

findManyData();