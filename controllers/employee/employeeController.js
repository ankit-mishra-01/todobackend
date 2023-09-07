import { Employee,EmployeeImage,EmployeeLeave } from "../../models/Employee.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createEmployee = async (req, res) => {
  try {
    const { name, email, password,image, terms } = req.body;
    console.log('');

    // Check if the email already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password before storing it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); // 10 is the salt rounds

    // Create a new employee object
    const { firstName, lastName } = req.body.name;
    const newEmployee =await new Employee({
      name: { firstName,lastName },
      email,
      password: hashedPassword,
      terms,
    });
    // Save the employee to the database
    const savedEmployee = await newEmployee.save();

console.log('image----------',req.body.image);
console.log('id----------',String(savedEmployee._id));
    // image creation with id and image
    const newEmployeeImage =await new EmployeeImage({image,employee:savedEmployee._id});
    const savedEmployeeImage = await newEmployeeImage.save();

    

    // Generate jwt token
    const token = jwt.sign(
      { employeeID: savedEmployee._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    res.status(201).json({
      message: "Employee created successfully",
      employee: savedEmployee,
      image:savedEmployeeImage,
      token: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating employee", error: error.message });
  }
};






// ----------------------------------------------------------------------------
export const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('email and password',email,password);
    if (email && password) {
      const employee = await Employee.findOne({ email });

      if (employee != null) {
        console.log('employee--',employee);
        const isMatched = await bcrypt.compare(password, employee.password);
        if (employee.email === email && isMatched) {
          // Generate jwt token
          const token = jwt.sign(
            { employeeID: employee._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRY }
          );
          res.send({ status: "success", message: "Login success", token });
        } else {
          res.send({
            status: "failed",
            message: "Please provide correct email or password",
          });
        }
      } else {
        res.send({ status: "failed", message: "Employee is not registered" });
      }
    } else {
      res
        .status(200)
        .send({ status: "failed", message: "Please fill all the fields" });
    }
  } catch (error) {
    console.log("Error", error);
  }
};

export const changeEmployeePassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  if (password && confirmPassword) {
    if (password === confirmPassword) {
      const salt = await bcrypt.genSalt(10);
      const newHashedPassword=await bcrypt.hash(password, salt);
      const employeeID=req.employee._id
      const employee=await Employee.findByIdAndUpdate(employeeID,{$set:{password:newHashedPassword}})
      await employee.save()
      res.status(201).send({status:"success",message:"Password changed successfully"})

    } else {
      res.send({
        status: "failed",
        message: "password and confirm password field doesn't match",
      });
    }
  } else {
    res.send({ status: "failed", message: "All fields are required" });
  }
};


export const loggedEmployee=async(req,res)=>{
  res.send({"employee":req.employee})
}


export const sendEmployeePasswordResetEmail=async(req,res)=>{
  const {email}=req.body;
  if(email){
    const employee=await Employee.findOne({email},"-password")
    console.log('employee----------',employee);
    if(employee){
      const secret=employee._id+process.env.JWT_SECRET_KEY
      const token=jwt.sign({employeeID:employee._id},secret,{expiresIn:'15m'})
      const link=`http://127.0.0.1:3000/api/employee/reset/${employee._id}/${token}`
      console.log('link',link);
      res.send({status:"success",message:"Password reset link has been shared, Please check your mail"})
    }
    else{
      res.send({status:"failed",message:"Email doesn't exist"})
    }
  } else{
    res.send({status:"failed",message:"Email field is required"})
  }

}


export const employeePasswordReset=async(req,res)=>{
  const {password,confirmPassword}=req.body
  const {id,token}=req.params

  const employee=await Employee.findById(id)
  const newSecret=employee._id+process.env.JWT_SECRET_KEY
  try {
    jwt.verify(token, newSecret)
    if(password&&confirmPassword){
      if(password===confirmPassword){
          const salt= await bcrypt.genSalt(10);
          const newHashedPassword= await bcrypt.hash(password, salt)
          await Employee.findByIdAndUpdate(employee._id, {$set:{password:newHashedPassword}})
          res.send({status:"success",message:"Password reset successfully"})
      }else{
        res.send({status:"failed",message:"new password and confirm password doesn't match"})
      }
    }else{}
  } catch (error) {
    
  }
}



// Request :GET
// route:employee

export const getEmployee = async (req, res) => {
  try {
    const employeeData=await loggedEmployee()
    console.log('employee data---------',employeeData);
    // const employeeEmail=req.params.email;
    const employee = await Employee.find(
      { email: req.params.email },
      "-password -terms"
    );
    res.status(200).json(employee);
  } catch (e) {
    console.log("Error", e);  
  }
};




export const createLeave = async (req, res) => {
  try {
    const {  } = req.body;

    // Check if the email already exists
    const existingEmployee = await EmployeeLeave.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password before storing it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); // 10 is the salt rounds

    // Create a new employee object
    const { firstName, lastName } = req.body.name;
    const newEmployee =await new Employee({
      name: { firstName,lastName },
      email,
      password: hashedPassword,
      terms,
    });
    // Save the employee to the database
    const savedEmployee = await newEmployee.save();

console.log('image----------',req.body.image);
console.log('id----------',String(savedEmployee._id));
    // image creation with id and image
    const newEmployeeImage =await new EmployeeImage({id:String(savedEmployee._id),image:req.body.image});
    const savedEmployeeImage = await newEmployeeImage.save();

    

    // Generate jwt token
    const token = jwt.sign(
      { employeeID: savedEmployee._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    res.status(201).json({
      message: "Employee created successfully",
      employee: savedEmployee,
      image:savedEmployeeImage,
      token: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating employee", error: error.message });
  }
};