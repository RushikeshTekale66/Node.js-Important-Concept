const express = require('express');
const router = express.Router();
const URL = require("../models/urls")

// it can display the all the operation that we perform on home page
router.get("/", async(req, res)=>{
    if(!req.user) return res.redirect("/login");
    const allUrls = await URL.find({createdBy: req.user._id});
    return res.render("home",{
        urls:allUrls
    })
})

router.get("/signup", (req, res)=>{
    return res.render("signup");
})

router.get("/login", (req, res)=>{
    return res.render("login");
})

module.exports = router;