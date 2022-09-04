import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { DialogState } from "../features/dialog/dialog";

import { SnackbarState } from "../features/snackbar/snackbar";
import { isValidSession } from "./validate";
import SnackCube from "../components/Snackbar/SnackCube";
import Dialog from "../components/Dialog";

const ProtectedRoute = () => {
   const navigate = useNavigate();

   const snackbar: SnackbarState = useAppSelector((state) => state.snackbar);
   const session: any = useAppSelector((state) => state.session);
   const dialog: DialogState = useAppSelector((state) => state.dialog);

   useEffect(() => {
      console.log("UE");
   }, [snackbar, session, dialog]);

   if (!isValidSession(session)) {
      setTimeout(() => navigate(`/`), 500);
      return (
         <div className='unauthorized'>
            <h1>Unauthorized </h1>

            <span>
               <NavLink to='/login'>Login</NavLink> to gain access
            </span>
         </div>
      );
   }

   // returns child route elements
   return (
      <>
         <Outlet />
         <SnackCube />
         {dialog && dialog.open ? <Dialog /> : <></>}
      </>
   );
};
export default ProtectedRoute;
