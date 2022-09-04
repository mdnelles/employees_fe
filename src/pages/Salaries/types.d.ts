export type SalariesObj = {
   emp_no: number;
   any_salary: number;
   any_start: string;
   any_finish: string;
   first_name: string;
   last_name: string;
};

export type SalariesArrType = SalariesObj[];

export interface SalariesType {
   init: boolean;
   arr: SalariesArrType;
}
