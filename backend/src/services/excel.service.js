import pkg from "exceljs";
const { Workbook } = pkg;

const parseExcelFile = async (filePath) => {
  const workbook = new Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(1);

  const employees = [];
  const headers = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      // Process header row
      row.eachCell((cell) => {
        headers.push(cell.value);
      });
    } else {
      // Process data rows
      const employee = {};
      row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
        const header = headers[colNumber - 1];
        if (header) {
          if (header === "skills") {
            employee[header] = cell.value.richText
              .map((skill) => skill.text)
              .join("")
              .split(",")
              .map((skill) => skill.trim());
          } else {
            employee[header] = cell.value;
          }
        }
      });
      // const employee = {
      //   employeeID: row.getCell(1).value,
      //   firstName: row.getCell(2).value,
      //   lastName: row.getCell(3).value,
      //   designation: row.getCell(4).value,
      //   status: row.getCell(5).value,
      //   joiningDate: row.getCell(6).value,
      //   birthDate: row.getCell(7).value,
      //   skills: row
      //     .getCell(8)
      //     .value.richText.map((skill) => skill.text)
      //     .join("")
      //     .split(",")
      //     .map((skill) => skill.trim()),
      //   salary: row.getCell(9).value,
      // };
      employees.push(employee);
    }
  });

  return employees;
};

export { parseExcelFile };
