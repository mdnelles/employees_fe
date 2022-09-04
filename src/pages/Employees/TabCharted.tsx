import React from "react";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

export default React.memo((props: any): JSX.Element => {
   const { salaries } = props;
   const salData: any = salaries.map((sal: any) => sal.salary);
   const salLabel: any = salaries.map((sal: any) => sal.from_date);
   ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
   );

   const options = {
      responsive: true,
      maintainAspectRatio: false,
      height: 600,
      plugins: {
         legend: {
            position: "top" as const,
         },
         title: {
            display: true,
            text: "Salary Chart",
         },
      },
   };

   const data = {
      labels: salLabel,
      datasets: [
         {
            label: "Salaries",
            data: salData,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
         },
      ],
   };

   return (
      <div style={{ minHeight: 600 }}>
         <Bar options={options} data={data} />
      </div>
   );
});
