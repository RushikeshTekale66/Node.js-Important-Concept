const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
// Socket server created
const server = http.createServer(app);
const io = new Server(server);

// 
io.on("connection", (socket) => {
  // Print the unique socket id
  console.log(socket.id);

  // user-message is same as client side
  socket.on("user-message", (message) => {
    io.emit("message", message);
    // Print the message sended by the client
    console.log("user message", message);
  })

  // Print the message when socket is diconnected
  socket.on("disconnect", () => {
    console.log("User disconnect");
  })
})

// File path resolved
app.use(express.static(path.resolve("./Public")))

// File rendering
app.get("/", (req, res) => {
  return res.sendFile("/Public/index.html");
})

// The port is associated to the io server
server.listen(9000, (port) => {
  console.log("App is live");
})