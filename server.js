console.log("Print Immediate");

//Schedule a function that run after specific delay
setTimeout(()=>{
    console.log("Print after 2 sec");
    
}, 2000)

setTimeout(Fun1, 4000);
function Fun1(){
    console.log("Print after 4 sec");
    
}

// We can also pass argument to it
function fun2(name, age){
    console.log("Data after 5 sec is ");    
    console.log("My name is : ", name , " My age is : ", age);
}

setTimeout(fun2, 5000, "Rushikesh", 23);