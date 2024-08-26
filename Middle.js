module.exports = ((req, res, next)=>{
    if(req.query.login){
        console.log("I have query for middleware ");
        next();
    }
    else{
        res.send("I don't have middleware");
    }
})