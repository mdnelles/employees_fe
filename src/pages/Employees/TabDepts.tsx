import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { deptType, salariesType } from "./types";
import Typography from "@mui/material/Typography";

export default React.memo((props: any): JSX.Element => {
   const { salaries = null, depts = null } = props;

   return (
      <>
         <h4>History</h4>
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }} aria-label='simple table'>
               <TableHead>
                  <TableRow>
                     <TableCell>
                        <Typography color='secondary.main'>Dept #</Typography>
                     </TableCell>
                     <TableCell>
                        <Typography color='secondary.main'>Start</Typography>
                     </TableCell>
                     <TableCell>
                        <Typography color='secondary.main'>Finish</Typography>
                     </TableCell>
                     <TableCell>
                        <Typography color='secondary.main'>Dept</Typography>
                     </TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {depts.map((row: deptType) => (
                     <TableRow
                        key={row.from_date}
                        sx={{
                           "&:last-child td, &:last-child th": { border: 0 },
                        }}
                     >
                        <TableCell>{row.dept_no}</TableCell>
                        <TableCell>{row.from_date}</TableCell>
                        <TableCell>{row.to_date}</TableCell>
                        <TableCell>{row.dept_name}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </>
   );
});
