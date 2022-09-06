import React from "react";
import DashboardTemplate from "../../components/Template/DashboardTemplate";
import UserDisplay from "./UserDisplay";

export default React.memo((): JSX.Element => {
   return (
      <DashboardTemplate>
         <h3>Users</h3>
         <UserDisplay />
      </DashboardTemplate>
   );
});
