import React from "react";
import DashboardTemplate from "../../components/Template/DashboardTemplate";
import ProfDisplay from "./ProfDisplay";

export default React.memo((): JSX.Element => {
   return (
      <DashboardTemplate>
         <ProfDisplay />
      </DashboardTemplate>
   );
});
