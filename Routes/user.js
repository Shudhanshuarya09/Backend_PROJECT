const express = require("express");

const router = express.Router();

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
  <ul>
  ${allDbUsers
    .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
    .join("")}
</ul>
  `;
  res.send(html);
});


//Rest API
app.get("/api/users", async (req, res) => {
  const allDbUsers = await user.find({});
  return res.json(allDbUsers);
});

app.route("/api/users/:id")
.get(async (req, res) => {
  const user = await User.findNyId(req.params.id);
  if (!user) return res.status(404).json({ erroe: "user not found"});
  return res.json(user);
})
.patch(async (req, res) => {
  await User.fundByIdAndUpdate(req.params.id, { lastName: "Changed"});
  return res.json({statsu: " Success"});
})
.delete(async (req, res) => {
  await User.findByIdAndDelete(req.params.Id);
  return res.json({status: "Success"});
});

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title 
  ) {
    return res.status(400).json({msg: "All fields are req..."});
  }
const result = await User.create({
  firstName: body.first_name,
  lastName: body.last_name,
  email: body.email,
  gender: body.gender,
  jobTitle: body.job_title,
});
return res.status(201).json({msg: "success"});

});