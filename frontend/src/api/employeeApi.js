import axios from "axios";

const serverURl = "http://localhost:3001/api";

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `${serverURl}/uploadEmployeeData`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

const fetchEmployees = async () => {
  const response = await axios.get(`${serverURl}/getEmployeeData`);
  return response.data;
};

const addEmployee = async (employeeData) => {
  const response = await axios.post(
    `${serverURl}/addEmployeeData`,
    employeeData
  );
  return response.data;
};

const updateEmployee = async (id, employeeData) => {
  const response = await axios.put(
    `${serverURl}/updateEmployeeData/${id}`,
    employeeData
  );
  return response.data;
};

const deleteEmployee = async (id) => {
  const response = await axios.delete(`${serverURl}/deleteEmployeeData/${id}`);
  return response.data;
};

export {
  uploadFile,
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
