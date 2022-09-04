import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Arr {
   id: number;
   title: string;
   details: string;
   createdAt: string;
   due: string;
}

export interface EmployeesTypesState {
   arr: Arr[];
   init: boolean;
}

const initialState: EmployeesTypesState = {
   arr: [],
   init: false,
};

export const stypesSlice = createSlice({
   name: "stypes",
   initialState,

   reducers: {
      setEmployeesTypes: (state, action: PayloadAction<any>) => {
         try {
            console.log(action.payload);
            state.arr = action.payload.arr;
            state.init = action.payload.init;
         } catch (error) {
            console.log(error);
         }
      },
      clearEmployeesTypes: (state) => initialState,
   },
});

export const { setEmployeesTypes, clearEmployeesTypes } = stypesSlice.actions;

export const selectEmployeesTypes = (state: RootState) => state.stype;

export default stypesSlice.reducer;
