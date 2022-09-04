import React from "react";
import DashboardTemplate from "../../components/Template/DashboardTemplate";

export default React.memo((): JSX.Element => {
   return (
      <DashboardTemplate>
         <h3>DB Schema</h3>
         <img
            src='./img/employees-schema.png'
            style={{
               maxWidth: "100%",
               height: "auto",
               borderRadius: 5,
               border: "2px solid #aaa",
            }}
         />
      </DashboardTemplate>
   );
});
