const path = require("path");
const express = require("express");
const multer = require("multer");

const app = express();
const port = 8000;

const storage = multer.diskStorage({
  destination: function(req, file, callBack){
    // save the file to /uploads
    return callBack(null, "./uploads");
  },
  filename: function(req, file, callBack){
    // file name : date+filename
    return callBack(null, `${Date.now()}-${file.originalname}`);
  }
})

// file in upload
const upload = multer({storage});

// Middle where
app.use(express.json()); //parse json
app.use(express.urlencoded({extended:false})) //handle the form data

// setting view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.get("/", (req, res)=>{
  return res.render("homepage");
})


app.post("/upload", upload.single("profileImage"), (req, res)=>{
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/");
})

app.listen(port, ()=>console.log("Server is live"));