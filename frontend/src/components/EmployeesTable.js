import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

export const EmployeesTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const sortedItems = items
    .slice()
    .sort((a, b) => a.employeeID.localeCompare(b.employeeID));
  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  return (
    <Card>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      onSelectAll?.();
                    } else {
                      onDeselectAll?.();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Joining Date</TableCell>
              <TableCell>Birth Date</TableCell>
              <TableCell>Skills</TableCell>
              <TableCell>Salary Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedItems.map((employee) => {
              const isSelected = selected.includes(employee.employeeID);
              const joiningDate = format(
                new Date(employee.joiningDate),
                "dd/MM/yyyy"
              );
              const birthDate = format(
                new Date(employee.birthDate),
                "dd/MM/yyyy"
              );

              return (
                <TableRow hover key={employee.employeeID} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          onSelectOne?.(employee.employeeID);
                        } else {
                          onDeselectOne?.(employee.employeeID);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{employee.employeeID}</TableCell>
                  <TableCell>{employee.firstName}</TableCell>
                  <TableCell>{employee.lastName}</TableCell>
                  <TableCell>{employee.designation}</TableCell>
                  <TableCell>{employee.status}</TableCell>
                  <TableCell>{joiningDate}</TableCell>
                  <TableCell>{birthDate}</TableCell>
                  <TableCell>{employee.skills.join(", ")}</TableCell>
                  <TableCell>{employee.salary} </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      {/* Pagination */}
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

EmployeesTable.defaultProps = {
  count: 0,
  items: [],
  onPageChange: () => {},
  rowsPerPage: 0,
  selected: [],
};

EmployeesTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  onAddCustomDetails: PropTypes.func,
  onEditEmployee: PropTypes.func,
};
