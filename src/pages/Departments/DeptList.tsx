import React from "react";
import { styled } from "@mui/material/styles";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { DeptChartType, DeptsArrType } from "./types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import { rand } from "../../utilities/gen";

interface DeptListProps {
   labels: string[];
   datas: number[];
}

export default function DeptList(props: DeptListProps) {
   const { labels, datas } = props;

   const Demo = styled("div")(({ theme }) => ({
      backgroundColor: theme.palette.background.paper,
   }));

   return (
      <>
         <Typography sx={{ mt: 4, mb: 2 }} variant='h6' component='div'>
            Dept Count
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
