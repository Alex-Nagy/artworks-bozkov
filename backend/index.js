const express = require('express')
var cors = require('cors')

const fs = require('fs');

const app = express()
const port = 4000
app.use(cors())
app.use(express.json());

const users = require('./users.json');

app.post('/api/signup', (req, res) => {
  
  if (!req.body.name || !req.body.password) return res.status(400).json("Missing parameter"); // Hiányzó paraméter, vissza 400 és szöveg
  
  const userExists = users.some(user => user.name === req.body.name);
  if (userExists) return res.sendStatus(409); // Létező user, vissza 409

  const newUser = {
    name: req.body.name,
    password: req.body.password,
    todos: []
  }
  users.push(newUser);
  fs.writeFileSync('./users.json', JSON.stringify(users, null, 4));
  res.sendStatus(200);
})

app.post('/api/login', (req, res) => {
  const authorization = req.header('authorization');
  if (!authorization) return res.sendStatus(401);
  
  const [userName,password] = authorization.split(":::"); // Authentikáció
  const loggedUser = users.find(user => user.name === userName && user.password === password);
  if (!loggedUser) return res.sendStatus(401);

  res.sendStatus(200);
  
})  

/*
app.post('/api/todo', (req, res) => {
	const authorization = req.header('authorization');
	if (!authorization) return res.sendStatus(401);
	
	const [userName,password] = authorization.split(":::"); // Authentikáció
	const loggedUser = users.find(user => user.name === userName && user.password === password);
	if (!loggedUser) return res.sendStatus(401);

	if (!req.body.todo) return res.sendStatus(400);
	const todo = req.body.todo;
	loggedUser.todos.push(todo);
	fs.writeFileSync('./users.json', JSON.stringify(users, null, 4));
	res.sendStatus(200);
	
})    
*/
app.listen(port, () => {
  console.log(`CORS example app listening on port ${port}`)
})

/*
app.get('/', (req, res) => {
  res.send('Hello World!')
})  

app.get('/api/todos', (req, res) => {
  const authorization = req.header('authorization');
	if (!authorization) return res.sendStatus(401);
	
	const [userName,password] = authorization.split(":::"); // Authentikáció
	const loggedUser = users.find(user => user.name === userName && user.password === password);
	if (!loggedUser) return res.sendStatus(401);
  
	res.json(loggedUser.todos);
})  
*/