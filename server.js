console.log("Print First");

let Immid = setImmediate(()=>{
    console.log("Set Immediate");
    
});

console.log("Second");


// clearImmediate(Immid);

let TimeId = setTimeout(()=>{
    console.log("SetTimeout");
    
}, 1000)

console.log("Third");

// clearTimeout(TimeId);

let InterId = setInterval(()=>{
    console.log("Set Interval");
    
}, 1000)

console.log("Fourth");

// clearInterval(InterId);