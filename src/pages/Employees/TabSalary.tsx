import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { salariesType } from "./types";
import Typography from "@mui/material/Typography";

export default React.memo((props: any): JSX.Element => {
   const { salaries = null } = props;

   return (
      <>
         <h4>History</h4>
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }} aria-label='simple table'>
               <TableHead>
                  <TableRow>
                     <TableCell>
                        <Typography color='secondary.main'>Salary</Typography>
                     </TableCell>
                     <TableCell>
                        <Typography color='secondary.main'>Start</Typography>
                     </TableCell>
                     <TableCell>
                        <Typography color='secondary.main'>Finish</Typography>
                     </TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {salaries.map((row: salariesType) => (
                     <TableRow
                        key={row.from_date}
                        sx={{
                           "&:last-child td, &:last-child th": { border: 0 },
                        }}
                     >
                        <TableCell>
                           {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                           }).format(row.salary)}
                        </TableCell>
                        <TableCell>{row.from_date}</TableCell>
                        <TableCell>{row.to_date}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </>
   );
});
