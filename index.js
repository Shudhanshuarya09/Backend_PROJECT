const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//ROUTES
app.get("/users", (req, res) => {
  const html = `
  <ul>
  ${users.map((user) => `<li>${user.first_name}</li>`)}
  </ul>`;
  res.send(html);
});


//REST API CODES
app.get("/api/users", (req, res) => {
  return res.json(users);
  });

  
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

app.post('/api/users', (req, res) => {
  //ToDo: Create new user
  return res.json({ status: "pending"});
 });

 app.patch('/api/users/:id', (req, res) => {
  //ToDo: Update new user
  return res.json({ status: "pending"});
 });

 app.delete('/api/users/:id', (req, res) => {
  //ToDo: Delete the user
  return res.json({ status: "pending"});
 });


 //also we can write like this because in route same information is passing('/api/users/:id') so in the future lets suppose you have to change something in the route then you are not going to edit changes in code individually in all the get, patch, delete http methods.

app.route("/api/users.:id")

.get((req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
})
.patch((req, res) => {
  //ToDo: Update new user
  return res.json({ status: "pending"});
 })
.delete((req, res) => {
  //ToDo: Delete the user
  return res.json({ status: "pending"});
 });



app.listen(PORT, () => console.log(`server started at port 8000`));
