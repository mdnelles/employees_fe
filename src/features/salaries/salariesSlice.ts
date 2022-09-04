import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { SalariesState } from "./salaries";

const initialState: SalariesState = {
   arr: [],
   init: false,
};

export const salariesSlice = createSlice({
   name: "salaries",
   initialState,

   reducers: {
      setSalaries: (state, action: PayloadAction<any>) => {
         try {
            state.arr = action.payload.arr;
            state.init = action.payload.init;
         } catch (error) {
            console.log(error);
         }
      },
      clearSalaries: (state) => initialState,
   },
});

export const { setSalaries, clearSalaries } = salariesSlice.actions;

export const selectSalaries = (state: RootState) => state.salaries;

export default salariesSlice.reducer;
