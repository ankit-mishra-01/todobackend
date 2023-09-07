import Todo from "../models/Todo.js";

const dataFieldsForFrontend=[
"_id","title","text","status","createdAt"].join(" ")

export const getTodos = async (req, res) => {
  const todos = await Todo.find({},dataFieldsForFrontend);
  todos && res.status(200).json(todos);
};

export const addTodo = async (req, res) => {
  const { title, text, status } = req.body;
  const todo = await Todo.create({ title, text, status }).then(async(data)=>{return await Todo.findById(data._id,dataFieldsForFrontend)})
  console.log('todo------',todo);
  todo && res.status(200).json(todo);
};

export const removeTodo = async (req, res) => {
  const {_id}= req.body;
  const todo = await Todo.findByIdAndDelete(_id).select(dataFieldsForFrontend)
  todo && res.status(200).json(todo);
};

export const updateTodo = async (req, res) => {
  const {_id}= req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(_id,updatedData,{new:true});
  if (!updatedTodo) {
    return res.status(404).json({ message: `Todo with ID ${_id} not found.` });
  }
  return res.status(200).json(updatedTodo)
};
