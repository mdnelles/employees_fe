import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import {
   clearSnackbar,
   setSnackbar,
} from "../../../features/snackbar/snackbarSlice";
import { clearSession } from "../../../features/session/sessionSlice";
import { clearTodo } from "../../../features/todo/todoSlice";
import { clearEmployeesTypes } from "../../../features/stype/stypeSlice";
import { clearSuggest } from "../../../features/suggest/suggestSlice";
import { dia, msg } from "../../../utilities/gen";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import ProfSetting from "../../../pages/Profile/ProfSetting";
import { clearEmployees } from "../../../features/employees/employeesSlice";
import { clearDepartments } from "../../../features/departments/departmentsSlice";
import { clearTitles } from "../../../features/titles/titlesSlice";
import { clearUsers } from "../../../features/users/usersSlice";
import { clearManagers } from "../../../features/managers/managersSlice";
import { clearSalaries } from "../../../features/salaries/salariesSlice";

export default React.memo((): JSX.Element => {
   const navigate = useNavigate();
   const dis = useAppDispatch();

   const [anchorSe, setAnchorSe] = useState<null | HTMLElement>(null);
   const openSe = Boolean(anchorSe);
   const [anchorPr, setAnchorPr] = useState<null | HTMLElement>(null);
   const openPr = Boolean(anchorPr);

   const handleMenuCloseSe = () => setAnchorSe(null);
   const handleMenuClosePr = () => setAnchorPr(null);

   const handleProfile = () => {
      setAnchorPr(null);
      dis(setSnackbar(msg(`Loading Profile`, "info")));
      navigate(`/profile`);
   };

   const handleLogout = (
      event: React.MouseEvent<HTMLButtonElement> | any
   ): void => {
      dis(setSnackbar(msg(`Logging out`, "info")));
      setAnchorPr(event.currentTarget);
      dis(clearTodo());
      dis(clearSuggest());
      dis(clearEmployeesTypes());
      dis(clearEmployees());
      dis(clearDepartments());
      dis(clearTitles());
      dis(clearSalaries());
      dis(clearManagers());
      dis(clearUsers());
      dis(clearSnackbar());
      dis(clearSession());
      setTimeout(() => navigate(`/login`), 1200);
   };
   const handleClickSe = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorSe(event.currentTarget);
   };
   const handleClickPr = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorPr(event.currentTarget);
   };

   return (
      <>
         <IconButton
            id='basic-button'
            aria-controls={openSe ? "basic-menu" : undefined}
            aria-haspopup='true'
            aria-expanded={openSe ? "true" : undefined}
            onClick={handleClickSe}
         >
            <SettingsIcon style={{ color: "white" }} />
         </IconButton>
         <Menu
            id='basic-menu'
            anchorEl={anchorSe}
            open={openSe}
            onClose={handleMenuCloseSe}
            MenuListProps={{
               "aria-labelledby": "basic-button",
            }}
         >
            <Box sx={{ padding: 2 }}>
               <ProfSetting setAnchorSe={setAnchorSe} />
            </Box>
         </Menu>

         <IconButton
            id='basic-button'
            aria-controls={openPr ? "basic-menu" : undefined}
            aria-haspopup='true'
            aria-expanded={openPr ? "true" : undefined}
            onClick={handleClickPr}
         >
            <PersonIcon style={{ color: "white" }} />
         </IconButton>
         <Menu
            id='basic-menu'
            anchorEl={anchorPr}
            open={openPr}
            onClose={handleMenuClosePr}
            MenuListProps={{
               "aria-labelledby": "basic-button",
            }}
         >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={(event) => handleLogout(event)}>Logout</MenuItem>
         </Menu>
      </>
   );
});
