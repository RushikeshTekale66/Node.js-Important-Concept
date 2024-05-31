const express = require('express');
const router = express.Router();
const URL = require("../models/urls")

// it can display the all the operation that we perform on home page
router.get("/", async(req, res)=>{
    const allUrls = await URL.find({});
    return res.render("home",{
        urls:allUrls
    })
})

module.exports = router;