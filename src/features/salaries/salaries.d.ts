export interface SalArr {
   emp_no: number;
   any_salary: number;
   any_start: string;
   any_finish: string;
   first_name: string;
   last_name: string;
}

export interface SalariesState {
   arr: SalArr[];
   init: boolean;
}
