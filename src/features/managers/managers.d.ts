export interface MngArr {
   from_date: string;
   to_date: string;
   dept_name: string;
   dept_no: string;
   first_name: string;
   last_name: string;
   emp_no: number;
}

export interface MngState {
   arr: MngArr[];
   init: boolean;
}
