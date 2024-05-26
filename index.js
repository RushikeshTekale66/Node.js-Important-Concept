const url = require('url');

const address = "https://www.w3schools.com/nodejs/shownodejs.asp?filename=demo_querystring_summer";

const myUrl = url.parse(address, true);

console.log(myUrl.href);
console.log(myUrl.hostname);
console.log(myUrl.port);
console.log(myUrl.search);
console.log(myUrl.pathname);
console.log(myUrl.query);
console.log(myUrl.query.filename);