import * as React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";
import { SalariesArrType } from "./types";
import { useAppSelector } from "../../app/hooks";
import Typography from "@mui/material/Typography";

export default function SalDisplay() {
   const [pageSize, setPageSize] = React.useState<number>(10);

   const salaries: SalariesArrType = useAppSelector(
      (state: any) => state.salaries.arr
   );

   const rows = salaries;

   const columns: GridColDef[] = [
      { field: "emp_no", headerName: "Emp #", minWidth: 50 },
      { field: "any_salary", headerName: "Salary", minWidth: 50 },
      { field: "any_start", headerName: "Start", minWidth: 50 },
      { field: "any_finish", headerName: "Finish", minWidth: 50 },
      { field: "first_name", headerName: "First", minWidth: 50 },
      { field: "last_name", headerName: "Last", minWidth: 50 },
   ];

   return (
      <>
         <Typography color='primary.main'>
            Salaries (sortable) drill down
         </Typography>
         <div style={{ height: 650, maxWidth: 750 }}>
            <DataGrid
               rows={rows}
               columns={columns}
               getRowId={(row: any) => "i" + row.any_salary + row.first_name}
               pageSize={pageSize}
               onPageSizeChange={(newPageSize: any) => setPageSize(newPageSize)}
               rowsPerPageOptions={[5, 10, 20]}
               pagination
            />
         </div>
      </>
   );
}
