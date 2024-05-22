const User = require('./db');

const findData = async()=>{
  let result = await User.findOne({name:"Rushikesh Tekale"});
  console.log(result);
}

const findManyData = async()=>{
  let result = await User.find({rollno : {$gt:2}});
  console.log(result);
}

findData();
findManyData();