const User = require('./db');

// Insert single data in database
const insertData = async () => {
  const user = new User({
    name: "Vaibhav Tambare",
    rollno: "1"
  })

  try{
    const saveUser = await user.save();
    console.log("User saved", saveUser);
  }
  catch(e){
    console.log("Error on saving", e);
  }
}

// Insert multiple data in database

const insertManyData = async()=>{
  const users = [
    {
      name:"Adinath Tekale",
      rollno:2
    },
    {
      name:"Rushikesh Tekale",
      rollno:3
    }
  ]

  try{
    const saveUsers = await User.insertMany(users);
    console.log("Saved All user", saveUsers);
  }
  catch(e){
    console.log("Error while saving data ", e);
  }
}

// Insert One Data in database 
insertData();
insertManyData();