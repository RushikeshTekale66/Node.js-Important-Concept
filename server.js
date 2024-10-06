console.log("Print First");

setInterval(()=>{
    console.log("Functions 1 is running");
    
}, 2000)

let timerId = setInterval(()=>{
    console.log("Function 2 is running");
    
}, 1000);

clearInterval(timerId);