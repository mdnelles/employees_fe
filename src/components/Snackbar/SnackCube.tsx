import { useState, useEffect } from "react";
import Obj from "anim-3d-obj";
import { useAppSelector } from "../../app/hooks";
import Alert from "@mui/material/Alert";
import { AnimObj } from "../Anim/anim";
import { SessionState } from "../../features/session/session";
import { SnackbarState } from "../../features/snackbar/snackbar";

const height = 50;
const width = 320;

const global: { css: string; body: string } = {
   css: `opacity: .9;
         backface-visibility: hidden; 
         height:${height}
         width:100%;
         font-family: Arial, Helvetica, sans-serif;
         `,
   body: "Employees",
};

const SnackCube = () => {
   const snackbar: SnackbarState = useAppSelector((state) => state.snackbar);
   const session: any = useAppSelector((state) => state.session);
   const speed: number = session.speed;

   const [display, displaySet] = useState<any>(true);
   let animName = "noAnim";

   if (snackbar.cubeFocus === 1) animName = "fwdx2736";
   else if (snackbar.cubeFocus === 2) animName = "fwdx09";
   else if (snackbar.cubeFocus === 3) animName = "fwdx918";
   else if (snackbar.cubeFocus === 4) animName = "fwdx1827";

   const faces = [
      {
         name: "front",
         body: (
            <Alert
               severity={snackbar.custom[1].severity}
               sx={{ width: "100%" }}
            >
               {snackbar.custom[1].msg || "front"}
            </Alert>
         ),
      },
      {
         name: "bottom",
         body: (
            <Alert
               severity={snackbar.custom[2].severity}
               sx={{ width: "100%" }}
            >
               {snackbar.custom[2].msg || "bottom"}
            </Alert>
         ),
      },
      {
         name: "back",
         body: (
            <div style={{ transform: `rotate(180deg)` }}>
               <Alert
                  severity={snackbar.custom[3].severity}
                  sx={{ width: "100%" }}
               >
                  {snackbar.custom[3].msg || "back"}
               </Alert>
            </div>
         ),
      },
      {
         name: "top",
         body: (
            <Alert
               severity={snackbar.custom[4].severity}
               sx={{ width: "100%" }}
            >
               {snackbar.custom[4].msg || "top"}
            </Alert>
         ),
      },
   ];

   const anim1: object = {
      border: "",
      delay: 0,
      degreesHi: -45, // degrees if spin
      degreesLow: 90, // degrees if spin
      direction: "normal", //normal altenating reverse
      duration: speed,
      fillMode: "forwards", // node forward backward both
      iterationCount: 1,
      name: animName,
      timing: "ease-out", // linear ease ease-in-out
   };
   const anim2: object = {
      border: "",
      delay: 0,
      degreesHi: -45, // degrees if spin
      degreesLow: 90, // degrees if spin
      direction: "normal", //normal altenating reverse
      duration: speed,
      fillMode: "forward", // node forward backward both
      iterationCount: 1,
      name: "noAnim",
      timing: "ease-out", // linear ease ease-in-out
   };

   useEffect(() => {
      displaySet(true);
      setTimeout(() => {
         displaySet(false);
      }, speed * 5000);
   }, [snackbar]);

   const objProps = {
      width,
      height,
      depth: height,
      perspectiveOrigin: "50% 50%",
      perspective: 900,
      zIndex: 10,
      faces,
      anim1,
      anim2,
      global,
      showCenterDiv: false,
   };

   return !display ? (
      <></>
   ) : (
      <div
         style={{
            zIndex: 10000,
            position: "absolute",
            left: 20,
            bottom: 10,
            height,
            width,
         }}
      >
         <Obj {...objProps} />
      </div>
   );
};

export default SnackCube;
