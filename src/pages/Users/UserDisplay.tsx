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
import { dia, msg, rand } from "../../utilities/gen";
import { setDialog } from "../../features/dialog/dialogSlice";
import { SessionState } from "../../features/session/session";

import Loading from "../../components/Loading";
import { IconButton } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BarChartIcon from "@mui/icons-material/BarChart";
import HistoryIcon from "@mui/icons-material/History";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { setUsers } from "../../features/users/usersSlice";
import { UserObj, UsersArrType, UsersState } from "../../features/users/users";

interface Column {
   id: "id" | "email" | "first_name" | "last_name" | "last_login";
   label: string;
   minWidth?: number;
}

const columns: readonly Column[] = [
   { id: "id", label: "ID", minWidth: 50 },
   { id: "email", label: "Email", minWidth: 70 },
   {
      id: "first_name",
      label: "First",
      minWidth: 50,
   },
   {
      id: "last_name",
      label: "Last",
      minWidth: 50,
   },
   {
      id: "last_login",
      label: "Logged",
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

   const users: UsersState = useAppSelector((state: any) => state.users);

   const rows: UsersArrType = !!users && users.arr ? users.arr : [];

   const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };

   const handleDetails = (row: UserObj, num: string) => {
      const { id } = row;

      dis(setSnackbar(msg(`Fetching user (${id}) details`, "info")));
      setTimeout(() => {
         dis(setSnackbar(msg(`Processing User ID: ${id}`, "success")));
      }, session.speed * 1.1 * 1000);
      dis(
         setDialog(
            dia(true, "User: " + id, "UseDetails", {
               id,
               num,
            })
         )
      );
   };

   const handleEdit = (row: UserObj) => {
      const { id } = row;

      dis(setSnackbar(msg(`Edit ${id}`, "info")));
      dis(
         setDialog(
            dia(true, `Edit ${id}`, "UseEdit", {
               row,
               table: "User",
               uid: "id",
            })
         )
      );
   };

   const handleDelete = (row: UserObj) => {
      if (window.confirm("Are you sure you want to delete this?")) {
         dis(
            setUsers({
               ...users,
               arr: users.arr.filter((e) => e.id !== row.id),
            })
         );
         dis(setSnackbar(msg(`Delete User ${row.id} `, "warning")));
      } else {
         dis(setSnackbar(msg(`Not Deleting User`, "info")));
         return false;
      }
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
                        <Loading name='Users' />
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
                                 key={row.id + rand()}
                              >
                                 {columns.map((column) => {
                                    return (
                                       <TableCell key={column.id}>
                                          {column.id === "id" ? (
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
