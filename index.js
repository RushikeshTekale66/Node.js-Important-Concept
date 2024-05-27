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

// Get data as per id which is provided
app.get("/api/users/:id", (req, res)=>{
  const id = Number(req.params.id);
  const user = users.find((user)=>user.id===id);
  res.json(user);
})

app.listen(port, () => { console.log(`App is live on ${port}`); })