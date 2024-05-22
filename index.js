const User = require('./db');

const findData = async()=>{
  let result = await User.findOne({});
  console.log(result);
}

const findManyData = async()=>{
  let result = await User.find({});
  console.log(result);
}

findData();
findManyData();