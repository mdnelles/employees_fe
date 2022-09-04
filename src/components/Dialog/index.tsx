import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { DialogState } from "../../features/dialog/dialog";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearDialog } from "../../features/dialog/dialogSlice";
import EmpDetails from "../../pages/Employees/EmpDetails";

const Transition = React.forwardRef(function Transition(
   props: TransitionProps & {
      children: React.ReactElement<any, any>;
   },
   ref: React.Ref<unknown>
) {
   return <Slide direction='up' ref={ref} {...props} />;
});

export default React.memo((): JSX.Element => {
   const dis = useAppDispatch();
   const dialog: DialogState = useAppSelector((state) => state.dialog);
   const { open, content, params } = dialog;

   const handleClose = () => {
      dis(clearDialog());
   };

   const compPicker = (content: string, params: any): any => {
      switch (content) {
         case "EmpDetails":
            return <EmpDetails params={params} />;

         default:
            return <EmpDetails params={params} />;
      }
   };

   return (
      <>
         <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby='alert-dialog-slide-description'
         >
            {compPicker(content, params)}
         </Dialog>
      </>
   );
});
