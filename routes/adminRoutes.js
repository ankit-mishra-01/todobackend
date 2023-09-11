
import express from "express";
import {
  getEmployee,
  getEmployees,
  deleteEmployee,
  getDashboardData,
} from "../controllers/admin/adminController.js";
import { authenticateEmployee } from "../middlewares/authMiddleware.js";

const adminRouter = express.Router();

// API for adminController
adminRouter.get("/api/employees", getEmployees);
adminRouter.get("/api/employees/:name", getEmployees);
adminRouter.get("/api/employee/:id", getEmployee);
adminRouter.get("/api/dashboard", getDashboardData);
adminRouter.delete("/api/employee/delete/:email", deleteEmployee);

adminRouter.get('/data',(req,res)=>{
console.log('--------------------request----------------------');
console.log('req.params',req.params)
console.log('req.query',req.query)	
console.log('req.body',req.body)	
console.log('req.headers',req.headers)	
console.log('req.method',req.method)
console.log('req.url',req.url)
console.log('req.path',req.path)	
console.log('req.hostname',req.hostname)
console.log('req.protocol',req.protocol)
console.log('req.ip',req.ip)
console.log('req.cookies',req.cookies)
console.log('req.session',req.session)
console.log('req.route',req.route)
// console.log('req.get',)
})

export {adminRouter}