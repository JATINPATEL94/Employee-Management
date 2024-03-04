import React, { useCallback, useEffect, useMemo, useState } from "react";
import { subDays, subHours } from "date-fns";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { EmployeesTable } from "./EmployeesTable";
import { useSelection } from "../hooks/use-selection";

const now = new Date();
const data = [
  {
    employeeID: "001",
    firstName: "John",
    lastName: "Doe",
    designation: "Sr. MERN Stack Developer",
    status: "present",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    birthDate: subDays(subHours(now, 7), 1).getTime(),
    skills: ["JavaScript", "React", "Node.js"],
    salaryDetails: 50000,
  },
  {
    employeeID: "002",
    firstName: "Jane",
    lastName: "Smith",
    designation: "Jr. Django Developer",
    status: "absent",
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    birthDate: subDays(subHours(now, 1), 2).getTime(),
    skills: ["Python", "Django", "SQL"],
    salaryDetails: 55000,
  },
  {
    employeeID: "003",
    firstName: "Michael",
    lastName: "Johnson",
    designation: "Sr. Java Developer",
    status: "present",
    createdAt: subDays(subHours(now, 5), 3).getTime(),
    birthDate: subDays(subHours(now, 5), 3).getTime(),
    skills: ["Java", "Spring Boot", "Hibernate"],
    salaryDetails: 60000,
  },
  {
    employeeID: "004",
    firstName: "Emily",
    lastName: "Brown",
    designation: "Frontend Developer",
    status: "present",
    createdAt: subDays(subHours(now, 3), 4).getTime(),
    birthDate: subDays(subHours(now, 3), 4).getTime(),
    skills: ["HTML", "CSS", "JavaScript"],
    salaryDetails: 48000,
  },
  {
    employeeID: "005",
    firstName: "David",
    lastName: "Wilson",
    designation: "Sr. .NET Developer",
    status: "absent",
    createdAt: subDays(subHours(now, 9), 5).getTime(),
    birthDate: subDays(subHours(now, 9), 5).getTime(),
    skills: ["C#", ".NET", "SQL Server"],
    salaryDetails: 62000,
  },
  {
    employeeID: "006",
    firstName: "Anna",
    lastName: "Martinez",
    designation: "Angular Developer",
    status: "present",
    createdAt: subDays(subHours(now, 2), 6).getTime(),
    birthDate: subDays(subHours(now, 2), 6).getTime(),
    skills: ["Angular", "TypeScript", "RxJS"],
    salaryDetails: 58000,
  },
  {
    employeeID: "007",
    firstName: "Daniel",
    lastName: "Miller",
    designation: "PHP Developer",
    status: "present",
    createdAt: subDays(subHours(now, 6), 7).getTime(),
    birthDate: subDays(subHours(now, 6), 7).getTime(),
    skills: ["PHP", "Laravel", "MySQL"],
    salaryDetails: 54000,
  },
  {
    employeeID: "008",
    firstName: "Olivia",
    lastName: "Garcia",
    designation: "Ruby on Rails Developer",
    status: "absent",
    createdAt: subDays(subHours(now, 4), 8).getTime(),
    birthDate: subDays(subHours(now, 4), 8).getTime(),
    skills: ["Ruby", "Rails", "PostgreSQL"],
    salaryDetails: 60000,
  },
  {
    employeeID: "009",
    firstName: "William",
    lastName: "Clark",
    designation: "Sr. Python Developer",
    status: "present",
    createdAt: subDays(subHours(now, 8), 9).getTime(),
    birthDate: subDays(subHours(now, 8), 9).getTime(),
    skills: ["Python", "Flask", "MongoDB"],
    salaryDetails: 57000,
  },
  {
    employeeID: "010",
    firstName: "Sophia",
    lastName: "Lopez",
    designation: "Vue.js Developer",
    status: "present",
    createdAt: subDays(subHours(now, 1), 10).getTime(),
    birthDate: subDays(subHours(now, 1), 10).getTime(),
    skills: ["Vue.js", "Vuex", "Vue Router"],
    salaryDetails: 59000,
  },
];

// Delete after db connection

const usePathname = () => {
  const [pathname, setPathname] = useState(window.location.pathname);

  const handlePathnameChange = useCallback(() => {
    setPathname(window.location.pathname);
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", handlePathnameChange);
    return () => {
      window.removeEventListener("popstate", handlePathnameChange);
    };
  }, [handlePathnameChange]);

  return pathname;
};

// calculate page and rows per page
const useEmployees = (page, rowsPerPage) => {
  return useMemo(() => {
    if (Array.isArray(data)) {
      const start = page * rowsPerPage;
      const end = start + rowsPerPage;
      return data.slice(start, end);
    }
    return [];
  }, [page, rowsPerPage]);
};

const useEmployeeIds = (employees) => {
  return useMemo(() => {
    return employees.map((employee) => employee.employeeID);
  }, [employees]);
};

const Dashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  usePathname();
  const employees = useEmployees(page, rowsPerPage);
  const employeeIds = useEmployeeIds(employees);
  const employeeSelection = useSelection(employeeIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

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
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
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
            </Stack>
            <EmployeesTable
              count={data.length}
              items={employees}
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
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
