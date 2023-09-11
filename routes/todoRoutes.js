import express from 'express'
import { getTodos,addTodo,removeTodo,todoEnums, updateTodo,filterTodo } from '../controllers/todoController.js'


const todoRouter=express.Router()

todoRouter.get('/api/todos/enums',todoEnums)

todoRouter.get('/api/todos',getTodos)
todoRouter.get('/api/todos/filters/:filter',filterTodo)
todoRouter.post('/api/todos/add',addTodo)
todoRouter.put('/api/todos/update',updateTodo)
todoRouter.delete('/api/todos/delete',removeTodo)

export {todoRouter}