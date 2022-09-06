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
import Tooltip from "@mui/material/Tooltip";
import { setSnackbar } from "../../features/snackbar/snackbarSlice";
import { buildData, dia, msg } from "../../utilities/gen";

import Loading from "../../components/Loading";
import { IconButton } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Typography from "@mui/material/Typography";
import { DeptChartType, DeptsArrType, DeptsObj } from "./types";
import { EmployeesArrType } from "../Employees/types";
import DeptChart from "./DeptChart";
import DeptList from "./DeptList";

interface Column {
   id: "dept_no" | "dept_name";
   label: string;
   minWidth?: number;
}

const columns: readonly Column[] = [
   { id: "dept_no", label: "Dept ID", minWidth: 50 },
   { id: "dept_name", label: "Dept Name", minWidth: 70 },
];

export default React.memo((): JSX.Element => {
   const dis = useAppDispatch();
   const [page, setPage] = React.useState(0);
   const [data, dataSet] = React.useState<DeptChartType | any>(undefined);
   const [rowsPerPage, setRowsPerPage] = React.useState(5);
   const datas: number[] = [];
   const labels: string[] = [];

   const session: any = useAppSelector(
      (state: { session: any }) => state.session
   );

   const departments: DeptsArrType = useAppSelector(
      (state: any) => state.departments.arr
   );

   const employees: EmployeesArrType = useAppSelector(
      (state: any) => state.employees.arr
   );

   const rows: DeptsArrType = departments;

   const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };

   departments.map((d) => {
      labels.push(d.dept_name);
      const count = employees.filter((e) => e.dept_no === d.dept_no);
      datas.push(count.length);
   });

   if (!data) dataSet(buildData(labels, datas));

   const handleDetails = (row: DeptsObj, num: string) => {
      const { dept_no, dept_name } = row;
      const id = dept_no;

      dis(setSnackbar(msg(`Fetching employees in dept (${id})`, "info")));
      setTimeout(() => {
         dis(setSnackbar(msg(`Processing Dept ${id}`, "success")));
      }, session.speed * 1.1 * 1000);
   };

   return (
      <>
         <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 300, padding: 10 }}>
               <DeptChart data={data} />
            </div>
            <div style={{ flex: 1, minWidth: 300, padding: 10 }}>
               <DeptList labels={labels} datas={datas} />
            </div>
         </div>

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
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {!rows[0] ? (
                        <TableCell colSpan={7}>
                           <Loading name='Departments' />
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
                                    key={row.dept_name}
                                 >
                                    {columns.map((column) => {
                                       return (
                                          <TableCell key={column.id}>
                                             {column.id === "dept_name" ? (
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
                                 </TableRow>
                              );
                           })
                     )}
                  </TableBody>
               </Table>
            </TableContainer>
            <TablePagination
               rowsPerPageOptions={[5, 10]}
               component='div'
               count={rows.length}
               rowsPerPage={rowsPerPage}
               page={page}
               onPageChange={handleChangePage}
               onRowsPerPageChange={handleChangeRowsPerPage}
            />
         </Paper>
      </>
   );
});
