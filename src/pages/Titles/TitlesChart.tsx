import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { TitleChartType, TitlesArrType } from "./types";
import { useAppSelector } from "../../app/hooks";
import { EmployeesArrType } from "../Employees/types";
import { buildData } from "../../utilities/gen";
import { DeptChartType } from "../Departments/types";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TitlesChart(): JSX.Element {
   const datas: number[] = [];
   const labels: string[] = [];
   const [data, dataSet] = React.useState<TitleChartType | any>(undefined);
   const session: any = useAppSelector(
      (state: { session: any }) => state.session
   );

   const employees: EmployeesArrType = useAppSelector(
      (state: any) => state.employees.arr
   );

   const titles: TitlesArrType = useAppSelector(
      (state: any) => state.titles.arr
   );

   titles.map((d) => {
      labels.push(d.title);
      const count = employees.filter((e) => e.title === d.title);
      datas.push(count.length);
   });

   if (!data) dataSet(buildData(labels, datas));

   return <Doughnut data={data} />;
}
