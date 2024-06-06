const express = require("express");
const { connectMongoDb } = require("./connection");
const URL = require("./models/urls");
const path = require("path");
const cookieParser = require("cookie-parser");
const {restrictTo, checkForAuthentication} = require("./middlewares/auth");

// Routes
const urlRoute = require("./routes/url");
const staticRoute  = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

connectMongoDb("mongodb://127.0.0.1:27017/short-url");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
// Used to parse the cookie data
app.use(cookieParser());
app.use(checkForAuthentication);

// for serverside rendaring we use ejs template engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
