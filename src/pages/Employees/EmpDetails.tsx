import { ContactsOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import React, { useEffect, useRef, useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useAppSelector } from "../../app/hooks";
import { SessionState } from "../../features/session/session";
import { apiPost } from "../../utilities/ApiRequest";
import Loading from "../../components/Loading";
import { deptType, detailsType, salariesArr } from "../Departments/types";
import TabSalary from "./TabSalary";
import TabCharted from "./TabCharted";
import TabDepts from "./TabDepts";

interface EmpDetailsProps {
   params: {
      id: number;
      num: string;
      first_name: string | undefined;
      last_name: string | undefined;
   };
}

export default function EmpDetails({ params }: EmpDetailsProps): JSX.Element {
   const { id, num, first_name, last_name } = params;
   const [details, detailsSet] = useState<detailsType | undefined>(undefined);
   const [salaries, salariesSet] = useState<salariesArr | undefined>(undefined);
   const [depts, deptsSet] = useState<deptType | undefined>(undefined);
   const [value, setValue] = useState(num);
   const init = useRef<boolean>(false);
   const session: any = useAppSelector(
      (state: { session: any }) => state.session
   );
   const token = session.user.token;
   try {
      if (!init.current && token) {
         (async () => {
            const ret = await apiPost("/emp_details", { token, emp_no: id });
            init.current = true;
            detailsSet(ret.data.data);
            salariesSet(ret.data.data.salaries);
            deptsSet(ret.data.data.departments);
         })();
      }
   } catch (err) {
      console.log(err);
   }
   const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
   };

   return (
      <div style={{ padding: 10 }}>
         Employee: {first_name} {last_name}
         {!init.current ? (
            <Loading name={"Employee History"} />
         ) : (
            <Box sx={{ width: "100%", typography: "body1" }}>
               <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                     <TabList onChange={handleChange}>
                        <Tab label='History' value='1' />
                        <Tab label='Charted' value='2' />
                        <Tab label='Dept(s)' value='3' />
                     </TabList>
                  </Box>
                  <TabPanel value='1'>
                     <TabSalary salaries={salaries} />
                  </TabPanel>
                  <TabPanel value='2'>
                     <TabCharted salaries={salaries} />
                  </TabPanel>
                  <TabPanel value='3'>
                     <TabDepts salaries={salaries} depts={depts} />
                  </TabPanel>
               </TabContext>
            </Box>
         )}
      </div>
   );
}
