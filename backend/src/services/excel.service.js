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
            console.log(cell.value);
            employee[header] = cell.value
              .split(",")
              .map((skill) => skill.trim());
          } else {
            employee[header] = cell.value;
          }
        }
      });

      employees.push(employee);
    }
  });

  return employees;
};

export { parseExcelFile };
