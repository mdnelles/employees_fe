import React from "react";
import { styled } from "@mui/material/styles";
import { TitleChartType, TitlesArrType } from "./types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import { buildData, rand } from "../../utilities/gen";
import { useAppSelector } from "../../app/hooks";
import { EmployeesArrType } from "../Employees/types";

export default function TitleList() {
   const datas: number[] = [];
   const labels: string[] = [];
   const [data, dataSet] = React.useState<TitleChartType | any>(undefined);

   const employees: EmployeesArrType = useAppSelector(
      (state: any) => state.employees.arr
   );

   const titles: TitlesArrType = useAppSelector(
      (state: any) => state.titles.arr
   );

   titles.map((d) => {
      labels.push(d.title);
      const count = employees.filter((e) => e.title === d.title);
      datas.push(count.length);
   });

   if (!data) dataSet(buildData(labels, datas));
   const Demo = styled("div")(({ theme }) => ({
      backgroundColor: theme.palette.background.paper,
   }));

   return (
      <>
         <Typography sx={{ mt: 4, mb: 2 }} variant='h6' component='div'>
            Title Count
         </Typography>
         <Demo>
            <List>
               {!datas[0]
                  ? null
                  : datas.map((d, i) => (
                       <ListItem key={rand()}>
                          <ListItemIcon>
                             <FolderIcon />
                          </ListItemIcon>
                          <ListItemText
                             primary={`${labels[i]} (${datas[i]})`}
                          />
                       </ListItem>
                    ))}
            </List>
         </Demo>
      </>
   );
}
