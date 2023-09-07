import mongoose from "mongoose";

// Employee---------------------------------------------------------------------------------
const employeeSchema = new mongoose.Schema({
  id: String,
  name: { firstName: String, middleName:String, lastName: String },
  status: { type:String, enum: ["Active", "Inactive"]},
  
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  terms: Boolean,
  mobile: {
    type: String,
  },
  birthDate: Date,
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  department: String,
  position: String,
  salary: {
    type: Number,
    min: 0,
  },
  about: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
});

// Address----------------------------------------------------------------------------------
const employeeAddressSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Reference to the Employee model
    required: true
  },
  type: {
    type: String,
    required: true
  },
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  postalCode: String,
  country: String
  // Add more address-related fields
});

// Project-----------------------------------------------------------------------------------
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  description: String
  // Add more project-related fields
});
// Schema for Employee Project
const employeeProjectSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Reference to the Employee model
    required: true
  },
  projects: [projectSchema] // An array of projects assigned to the employee
});

// Leave--------------------------------------------------------------------------------------
const employeeLeaveSchema = new mongoose.Schema({
 employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Reference to the Employee model
    required: true
  },
  leaveType: {
    type: String,
    enum: ['Vacation', 'Sick', 'Personal'],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  // ... other leave-related properties
});
// Attendance---------------------------------------------------------------------------------
const employeeAttendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Reference to the Employee model
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Late', 'Half-day'],
    default: 'Present',
  },
  // ... other attendance-related properties
});

// Benefit--------------------------------------------
const employeeBenefitSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Reference to the Employee model
    required: true
  },
  healthInsurance: {
    type: Boolean,
    default: false,
  },
  dentalInsurance: {
    type: Boolean,
    default: false,
  },
  retirementPlan: {
    type: String,
    enum: ['401k', 'IRA', 'Pension'],
    default: '401k',
  },
  vacationDays: {
    type: Number,
    default: 10,
  },
  // ... other benefit properties
});

// Document-------------------------------------------------------------------------------------
const employeeDocumentSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Reference to the Employee model
    required: true
  },
  documentType: {
    type: String,
    required: true
  },
  title: String,
  description: String,
  fileUrl: String, // Store a link to the document file
  uploadedAt: {
    type: Date,
    default: Date.now
  }
  // Add more document-related fields
});

// Feedback--------------------------------------------
const employeeFeedbackSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Reference to the Employee model
    required: true
  },
  feedbackType: {
    type: String,
    required: true
  },
  feedbackText: {
    type: String,
    required: true
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee' // Reference to the Employee model for the feedback submitter
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Image---------------------------------------------------------------------------------------------
const employeeImageSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Reference to the Employee model
    required: true
  },
  image: String, // Store a link to the image file
  uploadedAt: {
    type: Date,
    default: Date.now
  }
  // Add more image-related fields
});

// Payroll---------------------------------------------------------------------------------------------
const employeePayrollSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Reference to the Employee model
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  bonuses: {
    type: Number,
    default: 0
  },
  deductions: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  netSalary: {
    type: Number,
    required: true
  },
  payPeriodStart: {
    type: Date,
    required: true
  },
  payPeriodEnd: {
    type: Date,
    required: true
  },
  paymentDate: {
    type: Date,
    required: true
  }
  // Add more payroll-related fields
});


// Asset------------------------------------------------------------------------------------------------
const employeeAssetSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Reference to the Employee model
    required: true
  },
  assetName: {
    type: String,
    required: true,
  },
  assetType: {
    type: String,
    enum: ['Laptop', 'Phone', 'Tablet', 'Other'],
    required: true,
  },
  serialNumber: {
    type: String,
    unique: true,
    required: true,
  },
  assignmentDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Assigned', 'Returned'],
    default: 'Assigned',
  },
  // ... other asset-related properties
});


// Ticketing----------------------------------------------------------------------------------------------
const employeeTicketSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee", // Reference to the Employee model
    required: true,
  },
  ticketType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Closed"],
    default: "Open",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee", // Reference to the Employee model for the assignee
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});





// Defining model and collection name
const Employee = mongoose.model("Employee", employeeSchema);
const EmployeeAddress = mongoose.model('EmployeeAddress', employeeAddressSchema);
const EmployeeImage = mongoose.model('EmployeeImage', employeeImageSchema);
const EmployeeBenefit = mongoose.model('EmployeeBenefit', employeeBenefitSchema);
const EmployeeLeave = mongoose.model('EmployeeLeave', employeeLeaveSchema);
const EmployeeDocument = mongoose.model('EmployeeDocument', employeeDocumentSchema);
const EmployeePayroll = mongoose.model('EmployeePayroll', employeePayrollSchema);
const EmployeeProject = mongoose.model('EmployeeProject', employeeProjectSchema);
const EmployeeTicket = mongoose.model("EmployeeTicket", employeeTicketSchema);
const EmployeeFeedback = mongoose.model('EmployeeFeedback', employeeFeedbackSchema);
const EmployeeAsset = mongoose.model('EmployeeAsset', employeeAssetSchema);
const EmployeeAttendance = mongoose.model('EmployeeAttendance', employeeAttendanceSchema);


// Exporting all the models

export {
  Employee,
  EmployeeAddress,
  EmployeeImage,
  EmployeeBenefit,
  EmployeeLeave,
  EmployeeDocument,
  EmployeePayroll,
  EmployeeProject,
  EmployeeFeedback,
  EmployeeAsset,
  EmployeeTicket,
  EmployeeAttendance,
};
