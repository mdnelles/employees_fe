import { apiPost } from "./ApiRequest";

export const sqlPrep = ({ s }: { s: any }): string => {
   s = s.replace(/'/gi, "`");
   s = s.replace(/"/gi, '\\"');
   s = s.replace(/</g, "&lt;"); //for <
   s = s.replace(/>/g, "&gt;"); //for >

   return s;
};

export const rand = (): string => {
   const length = 20;
   let s = "";
   for (let i = 0; i < 20; i++) {
      s +=
         "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(
            (Math.random() * 62) | 0
         );
   }
   return s;
};

export const msg = (msg: string, severity: string) => {
   return {
      msg,
      severity,
   };
};
export const dia = (
   open: boolean,
   title: string,
   body: string,
   params: any
) => {
   return {
      open,
      title,
      body,
      params,
   };
};

export const fetcher = async (
   obj: any,
   setFunction: any,
   postUrl: string,
   token: any,
   dis: any
) => {
   if (!obj.init) {
      const res = await apiPost(postUrl, { token });
      if (!res.data.err && !obj.init) {
         dis(setFunction({ arr: res.data.data, init: true }));
      }
   }
};

export const buildData = (labels: string[], datas: number[]) => {
   return {
      labels,
      datasets: [
         {
            label: "# of Votes",
            data: datas,
            backgroundColor: [
               "rgba(255, 99, 132, 0.2)",
               "rgba(54, 162, 235, 0.2)",
               "rgba(255, 206, 86, 0.2)",
               "rgba(75, 192, 192, 0.2)",
               "rgba(153, 102, 255, 0.2)",
               "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
               "rgba(255, 99, 132, 1)",
               "rgba(54, 162, 235, 1)",
               "rgba(255, 206, 86, 1)",
               "rgba(75, 192, 192, 1)",
               "rgba(153, 102, 255, 1)",
               "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
         },
      ],
   };
};
