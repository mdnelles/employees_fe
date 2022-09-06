import DashboardTemplate from "../components/Template/DashboardTemplate";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { DeptState } from "../features/departments/departments";
import { EmpState } from "../features/employees/employees";
import { MngState } from "../features/managers/managers";
import { SalariesState } from "../features/salaries/salaries";
import { TitlesState } from "../features/titles/titles";
import { UsersState } from "../features/users/users";

import { setSnackbar } from "../features/snackbar/snackbarSlice";
import { apiPost } from "../utilities/ApiRequest";
import {
   clearEmployees,
   setEmployees,
} from "../features/employees/employeesSlice";
import { memo, useEffect, useRef, useState } from "react";
import {
   clearDepartments,
   setDepartments,
} from "../features/departments/departmentsSlice";
import { clearManagers, setManagers } from "../features/managers/managersSlice";
import { clearTitles, setTitles } from "../features/titles/titlesSlice";
import { clearSalaries, setSalaries } from "../features/salaries/salariesSlice";
import { clearUsers, setUsers } from "../features/users/usersSlice";
import LoadBox from "../components/LoadBox";

import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { msg } from "../utilities/gen";

export default function Dashboard(): JSX.Element {
   const dis = useAppDispatch();
   const fetchArr = useRef<string[]>([]);
   const departments: DeptState = useAppSelector((state) => state.departments);
   const employees: EmpState = useAppSelector((state) => state.employees);
   const managers: MngState = useAppSelector((state) => state.managers);
   const salaries: SalariesState = useAppSelector((state) => state.salaries);
   const titles: TitlesState = useAppSelector((state) => state.titles);
   const users: UsersState = useAppSelector((state) => state.users);
   const session: any = useAppSelector((state) => state.session);
   const token = session.user.token;
   const spd = session.speed;

   const [init, initSet] = useState<boolean>(false);

   const handleReloadDepartments = () => dis(clearDepartments());
   const handleReloadEmployees = () => dis(clearEmployees());
   const handleReloadManagers = () => dis(clearManagers());
   const handleReloadSalaries = () => dis(clearSalaries());
   const handleReloadTitles = () => dis(clearTitles());
   const handleReloadUsers = () => dis(clearUsers());

   const fetcher = async (
      obj: any,
      setFunction: ActionCreatorWithPayload<any>,
      postUrl: string,
      id: string | boolean
   ) => {
      if (!obj.init && !fetchArr.current.includes(postUrl)) {
         fetchArr.current.push(postUrl);
         const res = await apiPost(postUrl, { token });
         let arr = res.data.data;
         if (id) {
            // if id is passed filter using it
            const emp_nos = arr.map((o: { emp_no: any }) => o.emp_no);
            arr = arr.filter(
               ({ emp_no }: any, index: number) =>
                  !emp_nos.includes(emp_no, index + 1)
            );
         }

         if (!res.data.err && !obj.init) dis(setFunction({ arr, init: true }));
         else console.log("could not load from: " + postUrl);
      }
   };
   {
      setTimeout(() => {
         // delay to allow parent render
         fetcher(departments, setDepartments, "/dept_list", "dept_no");
         fetcher(employees, setEmployees, "/emp_list", "emp_no");
         fetcher(managers, setManagers, "/depman_list", "emp_no");
         fetcher(salaries, setSalaries, "/salary_list", false);
         fetcher(titles, setTitles, "/title_list", false);
         fetcher(users, setUsers, "/users_list", false);
      }, 100);
   }
   const allInit = (): boolean => {
      return departments.init &&
         employees.init &&
         managers.init &&
         salaries.init &&
         titles.init &&
         users.init
         ? true
         : false;
   };

   useEffect(() => {
      if (!init && allInit()) {
         initSet(true);
         dis(setSnackbar(msg(`Data Loaded`, "success")));
      }
   }, [departments, employees, managers, salaries, titles, users]);

   return (
      <DashboardTemplate>
         <h3>Loader</h3>

         <LoadBox
            obj={departments}
            title='Departments'
            handleFunction={handleReloadDepartments}
         />

         <LoadBox
            obj={employees}
            title='Employees'
            handleFunction={handleReloadEmployees}
         />

         <LoadBox
            obj={managers}
            title='Managers'
            handleFunction={handleReloadManagers}
         />

         <LoadBox
            obj={salaries}
            title='Salaries'
            handleFunction={handleReloadSalaries}
         />

         <LoadBox
            obj={users}
            title='Users'
            handleFunction={handleReloadUsers}
         />

         <LoadBox
            obj={titles}
            title='Titles'
            handleFunction={handleReloadTitles}
         />
      </DashboardTemplate>
   );
}
