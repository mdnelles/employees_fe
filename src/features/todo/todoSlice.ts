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
   arr: [
      {
         id: 30021,
         title: "Payroll",
         details: "Ensure all the payroll is up to date",
         createdAt: "1662475159",
         due: "1662475159",
      },
      {
         id: 30022,
         title: "Hire New Engineering Manager",
         details:
            "The Staff backlog is becoming a concern.  Check with Sloan and where we can allocate some budget to hire the manager.  This is the most pressing issue",
         createdAt: "1662475159",
         due: "Feb 25 2025",
      },
      {
         id: 30023,
         title: "Repair Class PC",
         details:
            "PC issues are cutting in to productivity of reps.  Find a solution ASAP",
         createdAt: "1662475159",
         due: "Mar 30 2026",
      },
   ],
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
