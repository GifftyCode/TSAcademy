const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json()); //middleware to parse JSON request bodies

const todos = []; //in-memory array to store todo items

//create todo
app.post("/todos", (req, res) => {
  const { title, description } = req.body;
  // validate request body
  if (!title || !description)
    return res
      .status(400)
      .json({ status: "fail", message: "Fields cannot be empty" });

  const newTodo = {
    id: Date.now(),
    title,
    description,
    completed: false,
  };
  todos.push(newTodo);

  res.status(201).json(newTodo);
});

//Get todos
app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

// Get a single todo item by Id
app.get("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === todoId);

  if (!todo) return res.status(404).json({ error: "Todo not found." });

  res.json(todo);
});

// Update a todo item by id
app.patch("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const { title, description, completed } = req.body;

  const todo = todos.find((t) => t.id === todoId);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found!" });
  }
  ((todo.title = title),
    (todo.description = description),
    (todo.completed = completed));

  res.json(todo);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});
