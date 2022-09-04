import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { MngState } from "./managers";

const initialState: MngState = {
   arr: [],
   init: false,
};

export const managersSlice = createSlice({
   name: "managers",
   initialState,

   reducers: {
      setManagers: (state, action: PayloadAction<any>) => {
         try {
            state.arr = action.payload.arr;
            state.init = action.payload.init;
         } catch (error) {
            console.log(error);
         }
      },
      clearManagers: (state) => initialState,
   },
});

export const { setManagers, clearManagers } = managersSlice.actions;

export const selectManagers = (state: RootState) => state.managers;

export default managersSlice.reducer;
