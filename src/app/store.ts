import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import sessionReducer from "../features/session/sessionSlice";
import snackbarReducer from "../features/snackbar/snackbarSlice";
import suggestReducer from "../features/suggest/suggestSlice";
import todoReducer from "../features/todo/todoSlice";
import stypeReducer from "../features/stype/stypeSlice";
import employeesReducer from "../features/employees/employeesSlice";
import departmentsReducer from "../features/departments/departmentsSlice";
import managersReducer from "../features/managers/managersSlice";
import salariesReducer from "../features/salaries/salariesSlice";
import titlesReducer from "../features/titles/titlesSlice";
import usersReducer from "../features/users/usersSlice";
import dialogReducer from "../features/dialog/dialogSlice";

export const store = configureStore({
   reducer: {
      session: sessionReducer,
      employees: employeesReducer,
      departments: departmentsReducer,
      managers: managersReducer,
      salaries: salariesReducer,
      snackbar: snackbarReducer,
      todo: todoReducer,
      stype: stypeReducer,
      suggest: suggestReducer,
      titles: titlesReducer,
      users: usersReducer,
      dialog: dialogReducer,
   },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;
