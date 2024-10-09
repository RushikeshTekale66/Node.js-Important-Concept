let fs = require("fs");

// Read file synchronously
console.log("Task 1");

let result = fs.readFileSync("./package.json", 'utf-8');
console.log(result);

console.log("Task 2");

