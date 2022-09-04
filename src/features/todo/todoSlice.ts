import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Arr {
   id: number;
   title: string;
   details: string;
   createdAt: string;
   due: string;
}

export interface TodoState {
   arr: Arr[];
   init: boolean;
}

const initialState: TodoState = {
   arr: [],
   init: false,
};

export const todoSlice = createSlice({
   name: "todo",
   initialState,

   reducers: {
      setTodo: (state, action: PayloadAction<any>) => {
         try {
            console.log(action.payload);
            state.arr = action.payload.arr;
            state.init = action.payload.init;
         } catch (error) {
            console.log(error);
         }
      },
      clearTodo: (state) => initialState,
   },
});

export const { setTodo, clearTodo } = todoSlice.actions;

export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;
