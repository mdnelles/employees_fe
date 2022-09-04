import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { DeptChartType, DeptsArrType } from "./types";
import { useAppSelector } from "../../app/hooks";
import { EmployeesArrType } from "../Employees/types";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DeptChart(props: DeptChartType | any): JSX.Element {
   const { data = {} } = props;

   return <Doughnut data={data} />;
}
