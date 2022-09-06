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
import { rand, msg, dia } from "../../utilities/gen";
import { SessionState } from "../../features/session/session";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Loading from "../../components/Loading";
import { IconButton } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Typography from "@mui/material/Typography";
import { ManagersArrType, ManagersObj } from "./types";
import { setManagers } from "../../features/managers/managersSlice";
import { setDialog } from "../../features/dialog/dialogSlice";

interface Column {
   id:
      | "from_date"
      | "to_date"
      | "dept_name"
      | "dept_no"
      | "emp_no"
      | "first_name"
      | "last_name";
   label: string;
   minWidth?: number;
}

const columns: readonly Column[] = [
   { id: "from_date", label: "start", minWidth: 50 },
   { id: "to_date", label: "finish", minWidth: 50 },
   { id: "dept_name", label: "dept", minWidth: 50 },
   { id: "dept_no", label: "#", minWidth: 50 },
   { id: "emp_no", label: "Emp", minWidth: 50 },
   { id: "first_name", label: "First", minWidth: 50 },
   { id: "last_name", label: "Last", minWidth: 50 },
];

export default React.memo((): JSX.Element => {
   const dis = useAppDispatch();
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);

   const session: any = useAppSelector(
      (state: { session: any }) => state.session
   );

   const managers: ManagersArrType = useAppSelector(
      (state: any) => state.managers.arr
   );

   const rows: ManagersArrType = managers;

   const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };

   const handleEdit = (row: ManagersObj) => {
      const { first_name, last_name } = row;

      dis(setSnackbar(msg(`Edit ${first_name} ${last_name}`, "info")));
      dis(
         setDialog(
            dia(true, `Edit ${first_name} ${last_name}`, "ManEdit", {
               row,
               table: "Manager",
               uid: "emp_no",
            })
         )
      );
   };

   const handleDelete = (row: ManagersObj) => {
      if (window.confirm("Are you sure you want to delete this?")) {
         dis(
            setManagers({
               ...managers,
               arr: managers.filter((e) => e.emp_no !== row.emp_no),
            })
         );
         dis(setSnackbar(msg(`Delete User ${row.emp_no} `, "warning")));
      } else {
         dis(setSnackbar(msg(`Not Deleting User`, "info")));
         return false;
      }
   };

   return (
      <>
         <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 300, padding: 10 }}></div>
            <div style={{ flex: 1, minWidth: 300, padding: 10 }}></div>
         </div>

         <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ minHeight: 540 }}>
               <Table stickyHeader aria-label='sticky table'>
                  <TableHead>
                     <TableRow>
                        {columns.map((column) => (
                           <TableCell
                              key={rand()}
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
                           <Loading name='Managers' />
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
                                    key={rand() + rand()}
                                 >
                                    {columns.map((column) => {
                                       return (
                                          <TableCell key={rand() + rand()}>
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
                                    <TableCell>
                                       <Tooltip title='Edit'>
                                          <IconButton
                                             color='primary'
                                             onClick={() => handleEdit(row)}
                                          >
                                             <EditIcon />
                                          </IconButton>
                                       </Tooltip>
                                       <Tooltip title='Edit'>
                                          <IconButton
                                             color='primary'
                                             onClick={() => handleDelete(row)}
                                          >
                                             <DeleteIcon />
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
