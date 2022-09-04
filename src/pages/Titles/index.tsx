import React from "react";
import DashboardTemplate from "../../components/Template/DashboardTemplate";
import TitlesDisplay from "./TitlesDisplay";

export default React.memo((): JSX.Element => {
   return (
      <DashboardTemplate>
         <h3>Titles</h3>
         <TitlesDisplay />
      </DashboardTemplate>
   );
});
