const express = require("express");
const mongoose = require('mongoose');

const port = 5000;
const app = express();
app.use(express.urlencoded());

// Connection link
mongoose.connect('mongodb://127.0.0.1:27017/NodePractice').then(() => { console.log("Mongo connected") }).catch((e) => { console.log("Error ", e) });

// Schema for collection
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String
  }
},
  { timestamps: true })

// Modele ie collection creation
const User = mongoose.model("users", userSchema);

// Get all the user form database & render it to html
app.get("/users", async (req, res) => {
  const allDbUser = await User.find({});
  const html = `
  <ul>
  ${allDbUser.map((user) => `<li>${user.firstName}</li>`)}
  </ul>
  `;
  res.send(html);
})

// Get all data from user as a json
app.get(('/api/users'), async (req, res) => {
  const allDbUser = await User.find({});
  res.json(allDbUser);
})

// Get data as per id which is provided ()
app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
})

// send data to database by post method
app.post("/api/user", async (req, res) => {
  const body = req.body;
  if (!body || !body.first_name || !body.last_name || !body.email || !body.gender) {
    return res.status(400).json({ msg: "All fields are require ..." })
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
  })
  console.log(result);
  return res.status(201).json({ msg: "Success" })
})

// Update data
app.patch("/api/users/:id", async (req, res) => {
  // Update user with id
  await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" })
  return res.json({ status: "success" });
})

app.delete("/api/users/:id", async (req, res) => {
  // Delete user with id
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "success" });
})

app.listen(port, (() => { console.log("Application is running on port ", port); }))