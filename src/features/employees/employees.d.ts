export type EmpArr = {
   emp_no: number;
   birth_date: string;
   first_name: string;
   last_name: string;
   gender: string;
   hire_date: string;
   dept_no: string;
   tite: string;
};

export interface EmpState {
   arr: EmpArr[];
   init: boolean;
}
