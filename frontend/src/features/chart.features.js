import Chart from "chart.js/auto";

let employeeStatusChart = null;

const generateEmployeeStatusChart = (employeesData) => {
  if (employeeStatusChart) {
    employeeStatusChart.destroy();
  }

  const statusCounts = {};
  employeesData.forEach((employee) => {
    if (statusCounts[employee.status]) {
      statusCounts[employee.status]++;
    } else {
      statusCounts[employee.status] = 1;
    }
  });

  const statusLabels = Object.keys(statusCounts);
  const statusData = Object.values(statusCounts);

  const ctx = document.getElementById("employeeStatusChart").getContext("2d");
  employeeStatusChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: statusLabels,
      datasets: [
        {
          label: "Employee Status",
          data: statusData,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
  });
  return employeeStatusChart;
};

let employeeSalaryChart = null;

const generateEmployeeSalaryChart = (employeesData) => {
  const sortedData = [...employeesData].sort((a, b) =>
    a.employeeID.localeCompare(b.employeeID)
  );

  if (employeeSalaryChart) {
    employeeSalaryChart.destroy();
  }

  const salaries = sortedData.map((employee) => employee.salary);
  const employeeIDs = sortedData.map((employee) => employee.employeeID);

  const ctx = document.getElementById("employeeSalaryChart").getContext("2d");
  employeeSalaryChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: employeeIDs,
      datasets: [
        {
          label: "Employee Salary",
          data: salaries,
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          fill: false,
        },
      ],
    },
  });
  return employeeSalaryChart;
};

let employeeDesignationChart = null;

const generateEmployeeDesignationChart = (employeesData) => {
  // Create a map to count the occurrences of each designation
  const designationCounts = {};
  employeesData.forEach((employee) => {
    if (designationCounts[employee.designation]) {
      designationCounts[employee.designation]++;
    } else {
      designationCounts[employee.designation] = 1;
    }
  });

  if (employeeDesignationChart) {
    employeeDesignationChart.destroy();
  }

  const designations = Object.keys(designationCounts);
  const designationData = Object.values(designationCounts);

  const ctx = document
    .getElementById("employeeDesignationChart")
    .getContext("2d");
  employeeDesignationChart = new Chart(ctx, {
    type: "polarArea",
    data: {
      labels: designations,
      datasets: [
        {
          label: "Employee Designation",
          data: designationData,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
  });
  return employeeDesignationChart;
};

export {
  generateEmployeeStatusChart,
  generateEmployeeSalaryChart,
  generateEmployeeDesignationChart,
};
