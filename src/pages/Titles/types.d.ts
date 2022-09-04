export type TitlesObj = {
   title: string;
};

export type TitlesArrType = TitlesObj[];

export interface TitlesType {
   init: boolean;
   arr: TitlesArrType;
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

export type TitleChartType = {
   labels: string[];
   datasets: [
      {
         label: string;
         data: number[];
         backgroundColor: string[];
         borderColor: string[];
         borderWidth?: number | undefined;
      }
   ];
};
