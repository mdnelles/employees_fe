import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { useAppDispatch } from "../../app/hooks";
import Alert from "@mui/material/Alert";
import { setSnackbar } from "../../features/snackbar/snackbarSlice";
import { useEffect } from "react";

interface SnackMsgProps {
   snackbarState: any;
}

export const SnackbarMsg = (props: SnackMsgProps) => {
   const { snackbarState } = props;
   const dis = useAppDispatch();

   useEffect(() => {
      console.log("UE inside snack");
      console.log(snackbarState);
   }, []);

   return (
      <>
         <Snackbar open={snackbarState.isOpen}>
            <Alert severity={snackbarState.severity} sx={{ width: "100%" }}>
               {snackbarState.msg}
            </Alert>
         </Snackbar>
      </>
   );
};
