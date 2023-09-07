import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import {employeeRouter} from './routes/employeeRoutes.js'
import {adminRouter} from './routes/adminRoutes.js'
import { todoRouter } from './routes/todoRoutes.js';
import cors from 'cors';
import {Employee} from './models/Employee.js';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

dotenv.config()
const app=express()
const PORT=process.env.PORT || 8000
const DATABASE_URL=process.env.DATABASE_URL ||"mongodb://localhost:27017"




console.log('database',process.env.DATABASE_URL);
console.log('port',process.env.PORT);


// Middleware

app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}))
app.use(express.json());
// app.use(notFound)
// app.use(errorHandler)

// connect to mongodb
connectDB(DATABASE_URL)

// Routes home
app.use('/',employeeRouter);
app.use('/',adminRouter);
app.use('/',todoRouter);


console.log('baseurl----',process.env.BASE_URL);
// Start app
app.listen(PORT,()=>{
        console.log('Backend/Server is running on port ',PORT);
})