import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create and Save Employees Data in DB
const saveEmployees = async (employees) => {
  try {
    await prisma.$transaction(
      employees.map((employee) =>
        prisma.employee.create({
          data: employee,
        })
      )
    );
    return { success: true, message: "Employees saved successfully" };
  } catch (error) {
    return {
      success: false,
      message: `Error When Saving Employees Data File in Database: ${error}`,
    };
  }
};

export { saveEmployees };
