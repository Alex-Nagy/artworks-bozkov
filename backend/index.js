const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const fs = require("fs");

app.use(cors());
app.use(express.json());

let users = require("./users.json");

app.post("/api/signup", (req, res) => {
  if (!req.body.name || !req.body.password)
    return res.status(400).json("missing credentials");
  const userExists = users.some((user) => user.name === req.body.name);
  if (userExists) return res.sendStatus(409);
  const user = {
    name: req.body.name,
    password: req.body.password,
    todos: [],
  };
  users.push(user);
  fs.writeFileSync("users.json", JSON.stringify(users, null, 4));
  res.sendStatus(200);
});

app.post("/api/todo", (req, res) => {
  const authHeader = req.header("authorization");
  if (!authHeader) return res.sendStatus(401);

  const userName = authHeader.split(":::")[0];
  const password = authHeader.split(":::")[1];

  const user = users.find(
    (user) => user.name === userName && user.password === password
  );

  if (!user) return res.sendStatus(401);

  if (!req.body.todo) return res.sendStatus(400);

  const todo = req.body.todo;

  user.todos.push(todo);
  fs.writeFileSync("users.json", JSON.stringify(users, null, 4));

  res.json(user.todos);
});

app.get("/api/todo", (req, res) => {
  const authHeader = req.header("authorization");
  if (!authHeader) return res.sendStatus(401);

  const userName = authHeader.split(":::")[0];
  const password = authHeader.split(":::")[1];

  const user = users.find(
    (user) => user.name === userName && user.password === password
  );

  if (!user) return res.sendStatus(401);

  res.json(user.todos);
});

app.post("/api/login", (req, res) => {
  const authHeader = req.header("authorization");
  if (!authHeader) return res.sendStatus(401);

  const userName = authHeader.split(":::")[0];
  const password = authHeader.split(":::")[1];

  const user = users.find(
    (user) => user.name === userName && user.password === password
  );

  if (!user) return res.sendStatus(401);

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
