// Single Module
const SingleModule = require("./SingleExport");
console.log(SingleModule(1,4));

// Multiple Mudule exports
const MultipleModule = require("./MultipleExports");
console.log(MultipleModule.add(1,2));
console.log(MultipleModule.sub(5,4));

// exports object
const ExportsObject = require("./ExportsObject");
console.log(ExportsObject.add(5,5));
console.log(ExportsObject.sub(10,5));