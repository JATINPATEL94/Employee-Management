import { PrismaClient } from "@prisma/client";
import { parseExcelFile } from "../services/excel.service.js";
import { saveEmployees } from "../services/employee.service.js";

const prisma = new PrismaClient();

// Save New Employees Excle File Data
const uploadEmployeeData = async (req, res) => {
  try {
    const employeesLocalPath = req.file?.path; //get local Employees file

    if (!employeesLocalPath) {
      return res.status(400).send("No file uploaded.");
    }

    // Read Excle File
    const response = await parseExcelFile(employeesLocalPath);

    // Save to DB
    const employees = await saveEmployees(response);
    if (employees.success === false) {
      res
        .status(404)
        .send("Error when Save Data to Database" + employees.message);
    }

    res.status(200).json({
      success: true,
      message: "Employees data has been successfully uploaded and saved.",
      data: employees,
    });
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Employee Data
const addEmployeeData = async (req, res) => {
  try {
    const {
      employeeID,
      firstName,
      lastName,
      designation,
      status,
      joiningDate,
      birthDate,
      skills,
      salary,
    } = req.body;

    // Convert joiningDate and birthDate to ISO-8601 format
    const formattedJoiningDate = new Date(joiningDate).toISOString();
    const formattedBirthDate = new Date(birthDate).toISOString();

    const newEmployee = {
      employeeID,
      firstName,
      lastName,
      designation,
      status,
      joiningDate: formattedJoiningDate,
      birthDate: formattedBirthDate,
      skills,
      salary,
    };

    const allEmployee = await prisma.employee.create({
      data: newEmployee,
    });

    res.status(200).json({
      success: true,
      message: "Employee data has been successfully added.",
      data: allEmployee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add employee data.",
      error: error.message,
    });
  }
};

// Update Employee Data
const updateEmployeeData = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedEmployee = await prisma.employee.update({
      where: { employeeID: id },
      data: updatedData,
    });

    res.status(200).json({
      success: true,
      message: "Employee data has been successfully updated.",
      data: updatedEmployee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update employee data.",
      error: error.message,
    });
  }
};

// Get Employee Data
const getEmployeeData = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();

    res.status(200).json({
      success: true,
      message: "Employee data retrieved successfully.",
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve employee data.",
      error: error.message,
    });
  }
};

// Delete Employee Data
const deleteEmployeeData = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.delete({
      where: { employeeID: id },
    });

    res.status(200).json({
      success: true,
      message: "Employee data has been successfully deleted.",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete employee data.",
      error: error.message,
    });
  }
};

export {
  uploadEmployeeData,
  addEmployeeData,
  updateEmployeeData,
  getEmployeeData,
  deleteEmployeeData,
};
