import React from "react";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import DashboardTemplate from "../../components/Template/DashboardTemplate";
import { SessionState } from "../../features/session/session";
import { setSnackbar } from "../../features/snackbar/snackbarSlice";
import { msg } from "../../utilities/gen";
import EmpDisplay from "./EmpDisplay";

export default React.memo((): JSX.Element => {
   const dis = useAppDispatch();
   const session: any = useAppSelector((state: any) => state.session);
   const speed = session.speed * 1000;
   const init = useRef<boolean>(false);

   setTimeout(() => {
      if (!init.current) {
         init.current = true;
         dis(setSnackbar(msg(`Loading Employees...`, "info")));
         setTimeout(() => {
            dis(setSnackbar(msg(`Employees Loaded`, "success")));
         }, speed * 2 + 20);
      }
   }, speed + 10);

   return (
      <DashboardTemplate>
         <h2>Employees</h2>
         <EmpDisplay />
      </DashboardTemplate>
   );
});
