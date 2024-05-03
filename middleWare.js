const express = require("express");
const fs = require("fs");
const users = require("./MOCK-DATA.json");

const app = express();
const PORT = 8000;

//Middleware-PlugIn
app.use(express.urlencoded({ extended: false })); //this middlware parsed all the data and send reqst to next middleware to response

app.use((req, res, next) => {
  console.log("Hello from middleware 1");
  // return res.end("Hey");  
    next();                          //this middleware return response which means next middleware tk request pochegi nhi to wo dekhega ni  phir usek aaage kuch v output mai code                                                  
});

app.use((req, res, next) => {              //Self-made middleware
  console.log("Hello from middleware 2");
 next();
});                                      //suppose middleware 2 tk ati hai request then ye middleware mai next() function lga hai so ye phir next route ka code execute krne lgega

//ROUTES
app.get("/users", (req, res) => {
  const html = `
  <ul>
  ${users.map((user) => `<li>${user.first_name}</li>`)}.join("")
  </ul>`;
  res.send(html);
});

//REST API
app.get("/api/users", (req, res) => {
  res.setHeader("X-myNAme","shudahnshu" );             //custom header you can make like this
  return res.json(users);
});

app
  .route("/api/users.:id")

  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    //ToDo: Update new user
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    //ToDo: Delete the user
    return res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
  //ToDo: Create new user
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK-DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

app.listen(PORT, () => console.log(`server started at port 8000`));
