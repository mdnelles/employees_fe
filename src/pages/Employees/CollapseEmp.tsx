import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RowEmp from "./RowEmp";
import { useAppSelector } from "../../app/hooks";
import { EmployeesArrType, EmployeesType } from "./types";

const CollapseEmp = () => {
   const employees: EmployeesType = useAppSelector(
      (state: any) => state.employees
   );

   const rows: Array<any | EmployeesArrType> =
      !!employees && employees.arr ? employees.arr : [];

   return (
      <TableContainer component={Paper}>
         <Table aria-label='collapsible table'>
            <TableHead>
               <TableRow>
                  <TableCell />
                  <TableCell>Emp #</TableCell>
                  <TableCell align='left'>DOB</TableCell>
                  <TableCell align='left'>FN</TableCell>
                  <TableCell align='left'>LN</TableCell>
                  <TableCell align='left'>G</TableCell>
                  <TableCell align='left'>Start</TableCell>
                  <TableCell align='left'>Details</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {!rows
                  ? null
                  : rows.map((row) => <RowEmp key={row.emp_no} row={row} />)}
            </TableBody>
         </Table>
      </TableContainer>
   );
};

export default CollapseEmp;
