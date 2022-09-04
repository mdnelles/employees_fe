import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
   EmployeesArrType,
   EmployeesType,
   EmployeesObj,
   salariesType,
} from "./types";
import Tooltip from "@mui/material/Tooltip";
import { setSnackbar } from "../../features/snackbar/snackbarSlice";
import { dia, msg, rand } from "../../utilities/gen";
import { setDialog } from "../../features/dialog/dialogSlice";
import { SessionState } from "../../features/session/session";

import Loading from "../../components/Loading";
import { IconButton } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BarChartIcon from "@mui/icons-material/BarChart";
import HistoryIcon from "@mui/icons-material/History";
import Typography from "@mui/material/Typography";

interface Column {
   id:
      | "emp_no"
      | "birth_date"
      | "first_name"
      | "last_name"
      | "gender"
      | "hire_date"
      | "dept_no"
      | "title";
   label: string;
   minWidth?: number;
}

const columns: readonly Column[] = [
   { id: "emp_no", label: "Emp No.", minWidth: 50 },
   { id: "birth_date", label: "DOB", minWidth: 70 },
   {
      id: "first_name",
      label: "First",
      minWidth: 70,
   },
   {
      id: "last_name",
      label: "Last",
      minWidth: 70,
   },
   {
      id: "gender",
      label: "Gender",
      minWidth: 50,
   },
   {
      id: "hire_date",
      label: "Start",
      minWidth: 50,
   },
   {
      id: "dept_no",
      label: "Dept",
      minWidth: 30,
   },
   {
      id: "title",
      label: "Title",
      minWidth: 50,
   },
];

export default React.memo((): JSX.Element => {
   const dis = useAppDispatch();
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);
   const session: any = useAppSelector(
      (state: { session: any }) => state.session
   );

   const employees: EmployeesType = useAppSelector(
      (state: any) => state.employees
   );

   const rows: EmployeesArrType =
      !!employees && employees.arr ? employees.arr : [];

   const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };

   const handleDetails = (row: EmployeesObj, num: string) => {
      const { first_name, last_name, emp_no } = row;
      const id = emp_no;

      dis(setSnackbar(msg(`Fetching employee (${id}) details`, "info")));
      setTimeout(() => {
         dis(setSnackbar(msg(`Processing Employee ID: ${id}`, "success")));
      }, session.speed * 1.1 * 1000);
      dis(
         setDialog(
            dia(true, "Employee: " + id, "EmpDetails", {
               id,
               num,
               first_name,
               last_name,
            })
         )
      );
   };

   return (
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
         <TableContainer sx={{ minHeight: 540 }}>
            <Table stickyHeader aria-label='sticky table'>
               <TableHead>
                  <TableRow>
                     {columns.map((column) => (
                        <TableCell
                           key={column.id}
                           style={{ minWidth: column.minWidth }}
                        >
                           {column.label}
                        </TableCell>
                     ))}
                     <TableCell>Details</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {!rows[0] ? (
                     <TableCell colSpan={7}>
                        <Loading name='Employees' />
                     </TableCell>
                  ) : (
                     rows
                        .slice(
                           page * rowsPerPage,
                           page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                           return (
                              <TableRow
                                 hover
                                 role='checkbox'
                                 tabIndex={-1}
                                 key={row.emp_no + rand()}
                              >
                                 {columns.map((column) => {
                                    return (
                                       <TableCell key={column.id}>
                                          {column.id === "emp_no" ? (
                                             <Typography color='primary.main'>
                                                {row[column.id]}
                                             </Typography>
                                          ) : (
                                             <Typography color='text.secondary'>
                                                {row[column.id]}
                                             </Typography>
                                          )}
                                       </TableCell>
                                    );
                                 })}
                                 <TableCell>
                                    <Tooltip title='Salary History'>
                                       <IconButton
                                          color='primary'
                                          onClick={() =>
                                             handleDetails(row, "1")
                                          }
                                       >
                                          <AttachMoneyIcon />
                                       </IconButton>
                                    </Tooltip>
                                    <Tooltip title='Chart Salary History'>
                                       <IconButton
                                          color='primary'
                                          onClick={() =>
                                             handleDetails(row, "2")
                                          }
                                       >
                                          <BarChartIcon />
                                       </IconButton>
                                    </Tooltip>
                                    <Tooltip title='Dept History'>
                                       <IconButton
                                          color='primary'
                                          onClick={() =>
                                             handleDetails(row, "3")
                                          }
                                       >
                                          <HistoryIcon />
                                       </IconButton>
                                    </Tooltip>
                                 </TableCell>
                              </TableRow>
                           );
                        })
                  )}
               </TableBody>
            </Table>
         </TableContainer>
         <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
         />
      </Paper>
   );
});
