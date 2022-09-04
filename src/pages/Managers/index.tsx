import React from "react";
import DashboardTemplate from "../../components/Template/DashboardTemplate";
import ManDisplay from "./ManDisplay";

export default React.memo((): JSX.Element => {
   return (
      <DashboardTemplate>
         <h3>Managers</h3>
         <ManDisplay />
      </DashboardTemplate>
   );
});
