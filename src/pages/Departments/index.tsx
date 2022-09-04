import React from "react";
import DashboardTemplate from "../../components/Template/DashboardTemplate";
import DeptDisplay from "./DeptDisplay";

export default React.memo((): JSX.Element => {
   return (
      <DashboardTemplate>
         <h3>Departments</h3>
         <DeptDisplay />
      </DashboardTemplate>
   );
});
