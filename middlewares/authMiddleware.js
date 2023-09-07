// middleware
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { Employee } from "../models/Employee.js";

export const authenticateEmployee = async (req, res, next) => {
    let token;
    const authorization=req.headers.authorization;
    if(authorization && authorization.startsWith("Bearer")){
      try {
        // get token from header
        token=authorization.split(' ')[1]

        console.log('token---------',token);
        // verify token
        const employeeID=await jwt.verify(token, process.env.JWT_SECRET_KEY).employeeID
        console.log('employeeid',jwt.verify(token, process.env.JWT_SECRET_KEY));
        //get employee from token
        req.employee=await Employee.findById(employeeID,"-password")
        next()
      } catch (error) {
        res.status(401).send({status:"failed",message:"Unauthorized employee"})
      }
    }
    if(!token){
      res.status(401).send({status:"failed",message:"Unauthorized employee, No Token"})
    }
}
