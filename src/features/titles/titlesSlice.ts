import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { TitlesState } from "./titles";

const initialState: TitlesState = {
   arr: [],
   init: false,
};

export const titlesSlice = createSlice({
   name: "titles",
   initialState,

   reducers: {
      setTitles: (state, action: PayloadAction<any>) => {
         try {
            state.arr = action.payload.arr;
            state.init = action.payload.init;
         } catch (error) {
            console.log(error);
         }
      },
      clearTitles: (state) => initialState,
   },
});

export const { setTitles, clearTitles } = titlesSlice.actions;

export const selectTitles = (state: RootState) => state.titles;

export default titlesSlice.reducer;
