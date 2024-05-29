const express = require("express");
const {connectMongoDb} = require("./connection");
// Connect with mongodb
connectMongoDb("mongodb://127.0.0.1:27017/NodePractice")

const userRouter = require("./routes/user")

const port = 5000;
const app = express();

// middlewhere
app.use(express.urlencoded());

// Routes
app.use('/api/user', userRouter);

app.listen(port, (() => { console.log("Application is running on port ", port); }))