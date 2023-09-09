import bcrypt from "bcrypt";
import { Employee, EmployeeImage } from "../../models/Employee.js";

export const getEmployees = async (req, res) => {
  var employees;
  try {
    const { name } = req.params;
    if (name) {
      await Employee.find(
        {
          $or: [
            { "name.firstName": { $regex: name.trim(), $options: "i" }},
            { "name.lastName": { $regex: name.trim(), $options: "i" }},
          ],
        },
        "-password -terms"
      )
        .then((data) => (employees = data))
        .catch((e) => e);
    } else {
      await Employee.find({}, "-password -terms")
        .then((data) => (employees = data))
        .catch((e) => e);
    }

    const employeeDataWithEmployeeImages = await Promise.all(
      employees.map(async (employee) => {
        const image = await EmployeeImage.findOne({ employee: employee._id });
        return {
          ...employee._doc,
          image: image ? image.image : null,
        };
      })
    );
    res.status(200).json(employeeDataWithEmployeeImages);
  } catch (e) {
    res.status(400).json({ message: "error", error: e });
  }
};

export const getEmployee = async (req, res) => {
  var employee;
  try {
    const { id } = req.params;
    if (id) {
      await Employee.find({ id }, "-password -terms")
        .then((data) => (employee = data))
        .catch((e) => e);
    }
    if(employee.length){
      const employeeDataWithEmployeeImages = await Promise.all(
        employee.map(async (emp) => {
          const image = await EmployeeImage.findOne({ employee: emp._id });
          return {
            ...emp._doc,
            image: image ? image.image : null,
          };
        })
      )
    return res.status(200).json(employeeDataWithEmployeeImages);
  }else{
    return res.status(204).json({status:"failed",message:"Either Employee id doesn't exist or you provided wrong id please check",data:employee});
  }
  } catch (e) {
    res.status(400).json({ message: "error", error: e });
  }
};

export const deleteEmployee = async (req, res) => {
  const { email } = req.params;
  const deletedEmployee = await Employee.findOneAndDelete({ email });
  res.status(201).json({
    status: "success",
    message: "Deleted the employee",
    deletedEmployee,
  });
};
export const getDashboardData = async (req, res) => {
  var dashboardData = {};
  console.log("running-------");
  try {
    console.log("running inside-------");

    dashboardData["gender"] = await Employee.aggregate([
      {
        $group: {
          _id: "$gender",
          totalSalary: { $sum: "$salary" },
          totalCount: { $sum: 1 },
        },
      },
    ]);
    dashboardData["totals"] = await Employee.aggregate([
      {
        $group: {
          _id: null,
          totalSalary: { $sum: "$salary" },
          totalCount: { $sum: 1 },
        },
      },
    ]);
    console.log("data--------", dashboardData);

    res.status(200).json(dashboardData);
  } catch (e) {
    res.status(400).json({ message: "error", error: e });
  }
};
