import express from "express";
import {
  createEmployee,
  // getEmployee,
  loginEmployee,
  changeEmployeePassword,
  loggedEmployee,
  sendEmployeePasswordResetEmail,
  employeePasswordReset
} from "../controllers/employee/employeeController.js";
import { authenticateEmployee } from "../middlewares/authMiddleware.js";

const employeeRouter = express.Router();

// Route level Middleware
employeeRouter.use("/api/employee/changepassword", authenticateEmployee);
employeeRouter.use("/api/employee/loggedemployee", authenticateEmployee);
// employeeRouter.use("/api/employee/login",authenticateEmployee)

// Public Routes --------------------------------------------------------------------
// API for employeeController
employeeRouter.post("/api/employee/register", createEmployee);
employeeRouter.post("/api/employee/login", loginEmployee);
employeeRouter.post("/api/employee/send-reset-password-email", sendEmployeePasswordResetEmail);
employeeRouter.post("/api/employee/reset-password/:id/:token", employeePasswordReset);

// Protected Routes --------------------------------------------------------------------
employeeRouter.post("/api/employee/changepassword", changeEmployeePassword);
employeeRouter.get("/api/employee/loggedemployee", loggedEmployee);
// employeeRouter.get("api/employee/:name", getEmployee);
// employeeRouter.get("/api/employee/login", getEmployee);


export { employeeRouter };
