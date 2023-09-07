
import express from "express";
import { getEmployees, deleteEmployee, getDashboardData } from "../controllers/admin/adminController.js";
import { authenticateEmployee } from "../middlewares/authMiddleware.js";

const adminRouter = express.Router();

// API for adminController
adminRouter.get("/api/employees", getEmployees);
adminRouter.get("/api/employees/:name", getEmployees);
adminRouter.get("/api/dashboard", getDashboardData);
adminRouter.delete("/api/employee/delete/:email", deleteEmployee);

export {adminRouter}