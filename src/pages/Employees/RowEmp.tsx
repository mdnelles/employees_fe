import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { EmployeesObj } from "./types";

const RowEmp = (props: { row: EmployeesObj }) => {
   const { row } = props;
   const [open, setOpen] = React.useState(false);

   return (
      <React.Fragment>
         <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell>
               <IconButton
                  aria-label='expand row'
                  size='small'
                  onClick={() => setOpen(!open)}
               >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
               </IconButton>
            </TableCell>
            <TableCell component='th' scope='row'>
               {row.emp_no}
            </TableCell>
            <TableCell align='right'>{row.birth_date}</TableCell>
            <TableCell align='right'>{row.first_name}</TableCell>
            <TableCell align='right'>{row.last_name}</TableCell>
            <TableCell align='right'>{row.gender}</TableCell>
            <TableCell align='right'>{row.hire_date}</TableCell>
            <TableCell align='right'></TableCell>
         </TableRow>
         <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
               <Collapse in={open} timeout='auto' unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                     <Typography variant='h6' gutterBottom component='div'>
                        History
                     </Typography>
                     <Table size='small' aria-label='purchases'>
                        <TableHead>
                           <TableRow>
                              <TableCell>Date</TableCell>
                              <TableCell>Customer</TableCell>
                              <TableCell align='right'>Amount</TableCell>
                              <TableCell align='right'>
                                 Total price ($)
                              </TableCell>
                           </TableRow>
                        </TableHead>
                        {/*
                        <TableBody>
                           {!row.history
                              ? null
                              : row.history.map((historyRow: any) => (
                                   <TableRow key={historyRow.date}>
                                      <TableCell component='th' scope='row'>
                                         {historyRow.date}
                                      </TableCell>
                                      <TableCell>
                                         {historyRow.customerId}
                                      </TableCell>
                                      <TableCell align='right'>
                                         {historyRow.amount}
                                      </TableCell>
                                      <TableCell align='right'></TableCell>
                                   </TableRow>
                                ))}
                        </TableBody>
                              */}
                     </Table>
                  </Box>
               </Collapse>
            </TableCell>
         </TableRow>
      </React.Fragment>
   );
};

export default RowEmp;
