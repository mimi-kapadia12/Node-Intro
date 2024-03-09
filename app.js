const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8081;

app.use(bodyParser.json());
const todoList = ["Wake up early", "Play cricket"];

app.get("/", (req, res) => {
  res.send(todoList.toString());
});

app.post("/", (req, res) => {
  todoList.push(req.body.name);
  res.send(todoList.toString());
});

app.delete("/", (req, res) => {
  const itemToDelete = req.body.name;
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i] == itemToDelete) {
      todoList.splice(i, 1);
    }
  }
  res.send(todoList.toString());
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
