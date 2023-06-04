const Todo = require('../models/todos/Todo');

const TodoController = {
  addTodo: async (req, res) => {
    console.log(req.body);
    try {
      const todo = new Todo(req.body);
      const response = await todo.addTodo(); 
      res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  fetchTodos: async (req, res) => {
    try {
      const todo = new Todo(req.params.userId);
      const response = await todo.fetchTodos();
      console.log(response);
      res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  removeTodo: async (req, res) => {
    const param = req.body?.id ? req.body.id : req.body.param;
    
    try {
      const todo = new Todo(param);
      const response = await todo.removeTodo();
      res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  modifyTodo: async (req, res) => {
    console.log(req.body);
    try {
      const todo = new Todo(req.body);
      const response = await todo.modifyTodo();
      res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    } 
  },
  
  
};

module.exports = { TodoController };
