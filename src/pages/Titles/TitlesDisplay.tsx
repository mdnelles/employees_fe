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
import { setDialog } from "../../features/dialog/dialogSlice";
import { SessionState } from "../../features/session/session";

import Loading from "../../components/Loading";
import { IconButton } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Typography from "@mui/material/Typography";
import { TitleChartType, TitlesArrType, TitlesObj } from "./types";
import { EmployeesArrType } from "../Employees/types";
import TitlesChart from "./TitlesChart";
import TitleList from "./TitleList";

interface Column {
   id: "dept_no" | "title";
   label: string;
   minWidth?: number;
}

const columns: readonly Column[] = [
   { id: "dept_no", label: "Title ID", minWidth: 50 },
   { id: "title", label: "DOB", minWidth: 70 },
];

export default React.memo((): JSX.Element => {
   const dis = useAppDispatch();

   const session: any = useAppSelector(
      (state: { session: any }) => state.session
   );

   const titles: TitlesArrType = useAppSelector(
      (state: any) => state.titles.arr
   );

   const rows = titles;

   const handleDetails = (row: TitlesObj, num: string) => {
      const { title } = row;
      /*
      dis(setSnackbar(msg(`Fetching employees in dept (${id})`, "info")));
      setTimeout(() => {
         dis(setSnackbar(msg(`Processing Title ${id}`, "success")));
      }, session.speed * 1.1 * 1000);
*/
   };

   return (
      <>
         <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 300, padding: 10 }}>
               <TitlesChart />
            </div>
            <div style={{ flex: 1, minWidth: 300, padding: 10 }}>
               <TitleList />
            </div>
         </div>

         <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ minHeight: 540 }}>
               <Table stickyHeader aria-label='sticky table'>
                  <TableHead>
                     <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Details</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {rows.map((row) => {
                        return (
                           <TableRow hover tabIndex={-1} key={row.title}>
                              <TableCell>{row.title}</TableCell>

                              <TableCell>
                                 <Tooltip title='Title Members'>
                                    <IconButton
                                       color='primary'
                                       onClick={() => handleDetails(row, "1")}
                                    >
                                       <PeopleAltIcon />
                                    </IconButton>
                                 </Tooltip>
                              </TableCell>
                           </TableRow>
                        );
                     })}
                  </TableBody>
               </Table>
            </TableContainer>
         </Paper>
      </>
   );
});
