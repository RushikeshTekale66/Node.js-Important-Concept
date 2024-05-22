const User = require('./db');

const deletedata = async()=>{
  let result = await User.deleteOne({rollno:{$gt:2}});
  let result2 = await User.deleteMany({rollno:{$gt:2}});
  console.log(result);
  console.log(result2);
}

deletedata();