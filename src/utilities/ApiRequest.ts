import axios from "axios";
import { API_REMOTE, API_LOCAL } from "../constants/api";

export const API_URL =
   !!window && window.location.href.toString().includes("localhost")
      ? API_LOCAL
      : API_REMOTE;

const axiosInstance = axios.create({
   baseURL: API_URL,
   timeout: 300000,
});

const processResponse = (res: any) => res.data;
const processFinally = () => {
   console.log("PF");
};
const processError = (err: any) => {
   if (axios.isCancel(err)) {
      throw new axios.Cancel(err.message);
   }

   return Promise.reject(err);
};

const action = (request: Promise<any>) =>
   request.then(processResponse).catch(processError).finally(processFinally);

const getBaseHeaders = (headers = {}, axiosHeaders = {}) => ({
   headers,
   ...axiosHeaders,
});

export const purePostAction = (
   path: any,
   data: object,
   headers?: any,
   outsideHeaders?: boolean
) => {
   return action(
      axiosInstance.post(
         path,
         data ?? null,
         getBaseHeaders(headers, outsideHeaders)
      )
   );
};

export const postAction = (
   path: any,
   data: object,
   headers: any,
   outsideHeaders: boolean
) => {
   console.log(path);
   const body = { ...data };

   return action(
      purePostAction(path, body, getBaseHeaders(headers, outsideHeaders))
   );
};

export const apiGet = async (path: string, args: object = {}) => {
   return await axios.request({
      method: "GET",
      url: API_URL + path,
      headers: {
         "Content-Type": "application/json; charset=UTF-8",
         "Accept": "Token",
         "Access-Control-Allow-Origin": "*",
      },
      data: args,
   });
};

export const apiPost = async (path: string, args: object = {}) => {
   try {
      const response = await axios.request({
         method: "POST",
         url: API_URL + path,
         headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Accept": "Token",
            "Access-Control-Allow-Origin": "*",
         },
         data: args,
      });

      return response.data;
   } catch (error: any) {
      const ret = { data: { err: true, message: "", status: 400 } };
      if (
         error.request &&
         error.request.status === "failed" &&
         error.request.type === "xhr"
      ) {
         ret.data.message = error.message;
         return ret;
      } else {
         ret.data.message = error.message;
         return ret;
      }
   }
};
