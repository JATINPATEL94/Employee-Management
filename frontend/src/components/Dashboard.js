import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  FormControl,
  FormLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@mui/material/TextField";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadFileAsync,
  fetchEmployeesAsync,
  addEmployeeAsync,
  updateEmployeeAsync,
  deleteEmployeeAsync,
} from "../reducers/employeeSlice";
import { EmployeesTable } from "./EmployeesTable";
import { useSelection } from "../hooks/use-selection";
import {
  generateEmployeeStatusChart,
  generateEmployeeSalaryChart,
  generateEmployeeDesignationChart,
} from "../features/chart.features";

const Dashboard = () => {
  // state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [newEmployeeData, setNewEmployeeData] = useState({
    employeeID: "",
    firstName: "",
    lastName: "",
    status: "",
    joiningDate: "",
    birthDate: "",
    skills: [],
    designation: "",
    salary: 0,
  });

  // input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "salary"
        ? parseInt(value)
        : name === "skills"
        ? value.split(",").map((skill) => skill.trim())
        : value;
    setNewEmployeeData((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  // hooks
  const dispatch = useDispatch();
  const employeesData = useSelector((state) => state.employees.employees);
  const status = useSelector((state) => state.employees.status);
  const error = useSelector((state) => state.employees.error);

  //Api call
  useEffect(() => {
    dispatch(fetchEmployeesAsync());
  }, [dispatch]);

  // Chart features
  useEffect(() => {
    if (status === "succeeded" && employeesData.length > 0) {
      generateEmployeeStatusChart(employeesData);
      generateEmployeeSalaryChart(employeesData);
      generateEmployeeDesignationChart(employeesData);
    }
  }, [status, employeesData]);

  // calculate page and rows per page
  const useEmployees = (page, rowsPerPage) => {
    return useMemo(() => {
      if (Array.isArray(employeesData)) {
        const start = page * rowsPerPage;
        const end = start + rowsPerPage;
        return employeesData.slice(start, end);
      }
      return [];
    }, [page, rowsPerPage]);
  };
  const employees = useEmployees(page, rowsPerPage);
  const useEmployeeIds = (employees) => {
    return useMemo(() => {
      return employees.map((employee) => employee.employeeID);
    }, [employees]);
  };
  const employeeIds = useEmployeeIds(employees);
  const employeeSelection = useSelection(employeeIds);
  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);
  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  // select employee for edit
  const select = employeeSelection.selected[0];
  const selectEmployee = employeesData.find(
    (employee) => employee.employeeID === select
  );
  useEffect(() => {
    if (selectEmployee) {
      setNewEmployeeData(selectEmployee);
    }
  }, [selectEmployee]);

  //upload file button style
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  // handle upload file
  const fileUploadStatus = useSelector(
    (state) => state.employees.fileUploadStatus
  );
  const fileUploadError = useSelector(
    (state) => state.employees.fileUploadError
  );
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uploadFileAsync(file));
      dispatch(fetchEmployeesAsync());
    }
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Employees</Typography>
              </Stack>
              <Stack>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                  />
                </Button>
                {fileUploadStatus === "loading" && <div>Uploading...</div>}
                {fileUploadStatus === "failed" && (
                  <div>Error: {fileUploadError}</div>
                )}
                {fileUploadStatus === "succeeded" && (
                  <div>File uploaded successfully!</div>
                )}
              </Stack>
              <Stack alignItems="center" direction="row" spacing={1}>
                <div>
                  <Button
                    onClick={() => {
                      dispatch(addEmployeeAsync(newEmployeeData));
                    }}
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Add
                  </Button>
                </div>
                <Button
                  variant="outlined"
                  onClick={() => {
                    dispatch(
                      updateEmployeeAsync({
                        employeeId: newEmployeeData.employeeID,
                        employeeData: newEmployeeData,
                      })
                    );
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    dispatch(
                      deleteEmployeeAsync(employeeSelection.selected[0])
                    );
                  }}
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
            <FormControl>
              <Stack direction="row" spacing={1}>
                <div>
                  <FormLabel>Employee ID</FormLabel>
                  <TextField
                    name="employeeID"
                    size="small"
                    type="text"
                    variant="outlined"
                    placeholder="Employee ID"
                    value={newEmployeeData.employeeID}
                    onChange={handleInputChange}
                    required
                  ></TextField>
                </div>
                <div>
                  <FormLabel>First Name</FormLabel>
                  <TextField
                    name="firstName"
                    size="small"
                    type="text"
                    variant="outlined"
                    placeholder="First Name"
                    value={newEmployeeData.firstName}
                    onChange={handleInputChange}
                    required
                  ></TextField>
                </div>
                <div>
                  <FormLabel>Last Name</FormLabel>
                  <TextField
                    name="lastName"
                    size="small"
                    type="text"
                    variant="outlined"
                    placeholder="Last Name"
                    value={newEmployeeData.lastName}
                    onChange={handleInputChange}
                    required
                  ></TextField>
                </div>
                <div>
                  <FormLabel>Designation</FormLabel>
                  <TextField
                    name="designation"
                    size="small"
                    type="text"
                    variant="outlined"
                    placeholder="Designation"
                    value={newEmployeeData.designation}
                    onChange={handleInputChange}
                    required
                  ></TextField>
                </div>
                <div>
                  <FormLabel>Status</FormLabel>
                  <TextField
                    name="status"
                    size="small"
                    type="text"
                    variant="outlined"
                    placeholder="Status"
                    value={newEmployeeData.status}
                    onChange={handleInputChange}
                    required
                  ></TextField>
                </div>
                <div>
                  <FormLabel>Joining Date</FormLabel>
                  <TextField
                    name="joiningDate"
                    size="small"
                    type="date"
                    variant="outlined"
                    value={newEmployeeData.joiningDate}
                    onChange={handleInputChange}
                    required
                  ></TextField>
                </div>
                <div>
                  <FormLabel>Birth Date</FormLabel>
                  <TextField
                    name="birthDate"
                    size="small"
                    type="date"
                    variant="outlined"
                    value={newEmployeeData.birthDate}
                    onChange={handleInputChange}
                    required
                  ></TextField>
                </div>
                <div>
                  <FormLabel>Skills</FormLabel>
                  <TextField
                    name="skills"
                    size="small"
                    type="text"
                    variant="outlined"
                    placeholder="Skills"
                    value={newEmployeeData.skills}
                    onChange={handleInputChange}
                    required
                  ></TextField>
                </div>
                <div>
                  <FormLabel>salary</FormLabel>
                  <TextField
                    name="salary"
                    size="small"
                    type="number"
                    variant="outlined"
                    placeholder="Salary"
                    value={newEmployeeData.salary}
                    onChange={handleInputChange}
                    required
                  ></TextField>
                </div>
              </Stack>
            </FormControl>
            {status === "loading" && <div>Loading...</div>}
            {status === "failed" && <div>Error: {error}</div>}
            {status === "succeeded" && employeesData.length > 0 && (
              <EmployeesTable
                count={employeesData.length}
                items={employeesData}
                onDeselectAll={employeeSelection.handleDeselectAll}
                onDeselectOne={employeeSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={employeeSelection.handleSelectAll}
                onSelectOne={employeeSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={employeeSelection.selected}
              />
            )}
          </Stack>
          <Stack spacing={3} justifyContent="space-between" direction="row">
            <div style={{ position: "relative", width: "50%" }}>
              <Typography variant="h5" marginY={"50px"}>
                Employee Status Chart
              </Typography>
              <canvas id="employeeStatusChart" />
            </div>
            <div style={{ position: "relative", width: "50%" }}>
              <Typography variant="h5" marginY={"50px"}>
                Employee Salary Chart
              </Typography>
              <canvas id="employeeSalaryChart" />
            </div>
          </Stack>
          <Stack>
            <Typography variant="h5" marginY={"50px"}>
              Employee Designation Chart
            </Typography>
            <canvas id="employeeDesignationChart" />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
