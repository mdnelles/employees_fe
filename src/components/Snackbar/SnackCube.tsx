import { useState, useEffect } from "react";
import { Cuboid } from "anim-3d-obj";
import { useAppSelector } from "../../app/hooks";
import Alert from "@mui/material/Alert";
import { AnimObj } from "../Anim/anim";
import { SessionState } from "../../features/session/session";
import { SnackbarState } from "../../features/snackbar/snackbar";

const faceprops = {
   front: true,
   back: true,
   left: false,
   right: false,
   top: true,
   bottom: true,
};

const height = 50;
const width = 320;
const left = 20;

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

   const custom: AnimObj = {
      front: {
         css: ``,
         body: (
            <Alert
               severity={snackbar.custom[1].severity}
               sx={{ width: "100%" }}
            >
               {snackbar.custom[1].msg || "front"}
            </Alert>
         ),
      },
      bottom: {
         css: ``,
         body: (
            <Alert
               severity={snackbar.custom[2].severity}
               sx={{ width: "100%" }}
            >
               {snackbar.custom[2].msg || "bottom"}
            </Alert>
         ),
      },
      back: {
         css: ``,
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
      top: {
         css: ``,
         body: (
            <Alert
               severity={snackbar.custom[4].severity}
               sx={{ width: "100%" }}
            >
               {snackbar.custom[4].msg || "top"}
            </Alert>
         ),
      },
   };
   const anim1Specs: object = {
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
   const anim2Specs: object = {
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

   return !display ? (
      <></>
   ) : (
      <div
         style={{
            zIndex: 10000,
            position: "absolute",
            left,
            bottom: 20,
            height,
            width,
         }}
      >
         <Cuboid
            width={width}
            height={height}
            depth={height}
            perspectiveOrigin='50% 50%'
            zIndex={10}
            anim1Specs={anim1Specs}
            anim2Specs={anim2Specs}
            faces={faceprops}
            global={global}
            custom={custom}
         />
      </div>
   );
};

export default SnackCube;
