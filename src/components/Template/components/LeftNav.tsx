import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PortraitIcon from "@mui/icons-material/Portrait";
import SchemaIcon from "@mui/icons-material/Schema";
import PeopleIcon from "@mui/icons-material/People";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CategoryIcon from "@mui/icons-material/Category";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import PaidIcon from "@mui/icons-material/Paid";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

interface LeftNavProps {
   goPage: any;
}

export const LeftNav = (props: LeftNavProps) => {
   const { goPage } = props;

   return (
      <div>
         <List component='nav'>
            <ListItemButton onClick={() => goPage(`/dashboard`)}>
               <ListItemIcon>
                  <DashboardIcon />
               </ListItemIcon>
               <ListItemText primary='Dashboard' />
            </ListItemButton>
            <ListItemButton onClick={() => goPage(`/employees`)}>
               <ListItemIcon>
                  <PeopleIcon />
               </ListItemIcon>
               <ListItemText primary='Employees' />
            </ListItemButton>
            <ListItemButton onClick={() => goPage(`/departments`)}>
               <ListItemIcon>
                  <CategoryIcon />
               </ListItemIcon>
               <ListItemText primary='Departments' />
            </ListItemButton>
            <ListItemButton onClick={() => goPage(`/managers`)}>
               <ListItemIcon>
                  <ContactEmergencyIcon />
               </ListItemIcon>
               <ListItemText primary='Managers' />
            </ListItemButton>
            <ListItemButton onClick={() => goPage(`/salaries`)}>
               <ListItemIcon>
                  <PaidIcon />
               </ListItemIcon>
               <ListItemText primary='Salaries' />
            </ListItemButton>
            <ListItemButton onClick={() => goPage(`/titles`)}>
               <ListItemIcon>
                  <TurnedInNotIcon />
               </ListItemIcon>
               <ListItemText primary='Titles' />
            </ListItemButton>

            <Divider sx={{ my: 1 }} />

            <ListSubheader component='div' inset>
               App Utilities
            </ListSubheader>
            <ListItemButton onClick={() => goPage(`/schema`)}>
               <ListItemIcon>
                  <SchemaIcon />
               </ListItemIcon>
               <ListItemText primary='DB Schema' />
            </ListItemButton>
            <ListItemButton onClick={() => goPage(`/todo`)}>
               <ListItemIcon>
                  <ListAltIcon />
               </ListItemIcon>
               <ListItemText primary='Todo List' />
            </ListItemButton>
            <ListItemButton onClick={() => goPage(`/users`)}>
               <ListItemIcon>
                  <PortraitIcon />
               </ListItemIcon>
               <ListItemText primary='App Users' />
            </ListItemButton>
            <ListItemButton onClick={() => goPage(`/profile`)}>
               <ListItemIcon>
                  <ManageAccountsIcon />
               </ListItemIcon>
               <ListItemText primary='My Profile' />
            </ListItemButton>
         </List>
      </div>
   );
};
