import React from "react";
import DashboardTemplate from "../../components/Template/DashboardTemplate";
import SalDisplay from "./SalDisplay";

export default React.memo((): JSX.Element => {
   return (
      <DashboardTemplate>
         <h3>Salaries</h3>
         <SalDisplay />
      </DashboardTemplate>
   );
});
