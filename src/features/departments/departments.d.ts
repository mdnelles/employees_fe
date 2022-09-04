export type DeptArr = {
   dept_no: string;
   dept_name: string;
};

export interface DeptState {
   arr: DeptArr[];
   init: boolean;
}
