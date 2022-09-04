export type ManagersObj = {
   from_date: string;
   to_date: string;
   dept_name: string;
   dept_no: string;
   first_name: string;
   last_name: string;
   emp_no: string;
};

export type ManagersArrType = ManagersObj[];

export interface ManagersType {
   init: boolean;
   arr: ManagersArrType;
}
