let os = require("os");

console.log("Total CPUs", os.cpus().length);
console.log("Current Platform is : ", os.platform());
console.log("Architecture is : ", os.arch());
console.log("Type of os ", os.type());
console.log("Current user name of os : ", os.userInfo().username);





