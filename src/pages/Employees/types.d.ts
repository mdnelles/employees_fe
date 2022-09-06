export type EmployeesObj = {
   emp_no: string;
   birth_date: string;
   first_name: string;
   last_name: string;
   gender: string;
   hire_date: string;
   dept_no: string;
   title: string;
};

export type EmployeesArrType = EmployeesObj[];

export interface EmployeesType {
   init: boolean;
   arr: EmployeesArrType;
}

export interface salariesType {
   emp_no: number;
   salary: number;
   from_date: string;
   to_date: string;
}
export type salariesArr = salariesType[];
export interface deptType {
   emp_no: number;
   dept_no: string;
   from_date: string;
   to_date: string;
   dept_name: string;
}
export interface detailsType {
   departments: deptType[];
   salaries: salariesType[];
}
export interface TabSalaryProps extends DetailsType {}

export const DetailsInit: DetailsType = {
   departments: [],
   salaries: [],
};
