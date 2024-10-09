let fs = require("fs");

// Read file synchronously
console.log("Task 1");

fs.readFile("package.json", 'utf-8', (error, result)=>{
    if(error) console.log("Got error : ", error);
    else console.log(result);
    
    
})

console.log("Task 2");

