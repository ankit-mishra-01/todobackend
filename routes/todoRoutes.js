import express from 'express'
import { getTodos,addTodo,removeTodo } from '../controllers/todoController.js'


const todoRouter=express.Router()

todoRouter.get('/api/todos',getTodos)
todoRouter.post('/api/todos/add',addTodo)
todoRouter.delete('/api/todos/delete',removeTodo)

export {todoRouter}