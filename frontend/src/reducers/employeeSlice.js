import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchEmployees,
  addEmployee as addEmployeeApi,
  updateEmployee as updateEmployeeApi,
  deleteEmployee as deleteEmployeeApi,
  uploadFile as uploadFileApi,
} from "../api/employeeApi";

const initialState = {
  employees: [],
  status: "idle",
  error: null,
};

export const uploadFileAsync = createAsyncThunk(
  "employees/uploadFile",
  async (file) => {
    const response = await uploadFileApi(file);
    return response.data;
  }
);

export const fetchEmployeesAsync = createAsyncThunk(
  "employees/fetch",
  async () => {
    return await fetchEmployees();
  }
);

export const addEmployeeAsync = createAsyncThunk(
  "employees/add",
  async (employeeData) => {
    return await addEmployeeApi(employeeData);
  }
);

export const updateEmployeeAsync = createAsyncThunk(
  "employees/update",
  async ({ employeeId, employeeData }) => {
    return await updateEmployeeApi(employeeId, employeeData);
  }
);

export const deleteEmployeeAsync = createAsyncThunk(
  "employees/delete",
  async (employeeId) => {
    return await deleteEmployeeApi(employeeId);
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployeesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload.data;
      })
      .addCase(fetchEmployeesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addEmployeeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEmployeeAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = [...state.employees, action.payload.data];
      })
      .addCase(addEmployeeAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateEmployeeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEmployeeAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.employees.findIndex(
          (employee) => employee.employeeID === action.payload.data.employeeID
        );
        if (index !== -1) {
          state.employees[index] = action.payload.data;
        }
      })
      .addCase(updateEmployeeAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteEmployeeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEmployeeAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = state.employees.filter(
          (employee) => employee.employeeID !== action.payload.data.employeeID
        );
      })
      .addCase(deleteEmployeeAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default employeeSlice.reducer;
