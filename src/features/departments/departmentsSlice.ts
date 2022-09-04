import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { DeptState } from "./departments";

const initialState: DeptState = {
   arr: [],
   init: false,
};

export const departmentsSlice = createSlice({
   name: "departments",
   initialState,

   reducers: {
      setDepartments: (state: DeptState, action: PayloadAction<any>) => {
         try {
            state.arr = action.payload.arr;
            state.init = action.payload.init;
         } catch (error) {
            console.log(error);
         }
      },
      clearDepartments: (state) => initialState,
   },
});

export const { setDepartments, clearDepartments } = departmentsSlice.actions;

export const selectDepartments = (state: RootState) => state.departments;

export default departmentsSlice.reducer;
