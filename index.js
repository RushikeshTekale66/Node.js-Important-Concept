const express = require('express');
const users = require('./MOCK_DATA.json');

const app = express();
const port = 5000;

// html data rendaring  (HTML document rendaring)
app.get("/users", (req, res) => {
  const html = `
  <ul>
  ${users.map((user) => `<li>${user.first_name}</li>`)}
  </ul>
  `;
  res.send(html);
})

// Get all data from user as a json
app.get(('/api/users'), (req, res) => {
  return res.json(users);
})

// Get data as per id which is provided ()
app.get("/api/users/:id", (req, res)=>{
  const id = Number(req.params.id);
  const user = users.find((user)=>user.id===id);
  res.json(user);
})

// send data to database by post method
app.post("/api/user", (req, res)=>{
  // create new user
  return res.json({status:"pending"});
})

// Update data
app.patch("/api/users/:id", (req, res)=>{
  // Update user with id
  return res.json({status:"pending"});
})

app.delete("/api/users", (req, res)=>{
  // Delete user with id
  return res.json({status:"pending"});
})

app.listen(port, () => { console.log(`App is live on ${port}`); })