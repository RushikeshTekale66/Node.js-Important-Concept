const express = require("express");
const { connectMongoDb } = require("./connection");
const urlRoute = require("./routes/url");
const staticRoute  = require("./routes/staticRouter");
const URL = require("./models/urls");
const path = require("path")

const app = express();
const PORT = 8001;

connectMongoDb("mongodb://127.0.0.1:27017/short-url");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// for serverside rendaring we use ejs template engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", urlRoute);
app.use("/", staticRoute);

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
