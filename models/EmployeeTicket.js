import mongoose from "mongoose";

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

const EmployeeTicket = mongoose.model("EmployeeTicket", employeeTicketSchema);

export { EmployeeTicket };
