import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { EmpArr, EmpState } from "./employees";

const initialState: EmpState = {
   arr: [],
   init: false,
};

export const employeesSlice = createSlice({
   name: "employees",
   initialState,

   reducers: {
      setEmployees: (state: EmpState, action: PayloadAction<any>) => {
         try {
            state.arr = action.payload.arr;
            state.init = action.payload.init;
         } catch (error) {
            console.log(error);
         }
      },
      clearEmployees: (state) => initialState,
   },
});

export const { setEmployees, clearEmployees } = employeesSlice.actions;

export const selectEmployees = (state: RootState) => state.employees;

export default employeesSlice.reducer;
