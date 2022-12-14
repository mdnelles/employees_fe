import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { SessionState } from "./session";
import { fetchSession } from "./sessionAPI";

const initialState: SessionState = {
   loginDisplay: 0,
   loginDisplayLastClicked: 0,
   paused: false,
   toggle: true,
   darkMode: false,
   speed: 0.3,
   status: "idle",
   user: {
      token: "",
      email: "",
      displayName: "Saul Goodman",
      photoUrl: "https://i.ibb.co/71Xs90h/Interesting-Man.jpg",
      uid: "user10093250",
      createdAt: 1651367411061,
      bio: `Lorem ipsum dolor sit amet. Qui eveniet cupiditate hic laudantium qui voluptas tempore quo doloremque consequatur! Ea assumenda autem ut omnis cupiditate qui sapiente magnam ab eveniet distinctio vel placeat quia ad sapiente rerum qui deserunt explicabo! Aut perferendis obcaecati sit quia quibusdam est excepturi consequatur sit nobis cupiditate non rerum ipsa et blanditiis corporis aut dolore magnam. 33 enim odit ut doloribus accusantium qui voluptatem obcaecati.

      Ut harum dolorem est fugiat dicta aut impedit rerum eos omnis impedit hic tempora obcaecati est pariatur rerum At quibusdam quia. Sed autem incidunt sed voluptatum voluptas qui nobis laborum quo excepturi eligendi aut doloremque expedita eos totam odit ut deserunt perspiciatis. Sed nemo praesentium est commodi mollitia 33 harum sequi et iste consequatur ad delectus galisum eum unde consequuntur.
      
      Aut laboriosam repellendus ut excepturi quia a nostrum pariatur? Eos facere voluptatem id quia impedit id vero totam qui neque fugit ea repellat earum."
      creationTime: `,
      lastLoginAt: 1661467511061,
      lastSignInTime: "1661467511061",
   },
   value: 0,
   dim: { wi: 100, he: 100 },
};

export const addAsync = createAsyncThunk(
   "./fetchSession",
   async (amount: number) => {
      const response = await fetchSession(amount);
      return response.data;
   }
);

export const sessionSlice = createSlice({
   name: "session",
   initialState,
   // The `reducers` field lets us define reducers and generate associated actions
   reducers: {
      setSession: (state, action: PayloadAction<SessionState>) => {
         const o: SessionState = action.payload;
         try {
            if (o.user.email) state.user.email = o.user.email;
            if (o.user.token) state.user.token = o.user.token;
            if (o.speed) state.speed = o.speed;
            if (o.user.lastLoginAt) state.user.lastLoginAt = o.user.lastLoginAt;

            state.darkMode = o.darkMode;
            state.loginDisplay = o.loginDisplay;
            state.paused = o.paused;
            state.loginDisplayLastClicked = o.loginDisplayLastClicked;
            state.status = o.status;
            state.value = o.value;
            state.dim = o.dim;
         } catch (error) {
            console.log(error);
         }
      },
      clearSession: (state) => {
         state.user.token = "";
         state.user.email = "";
         state.loginDisplay = 1; // 0 or -1, no login, 1 login, 2 show logout
         state.loginDisplayLastClicked = 2;
      },
      // Use the PayloadAction type to declare the contents of `action.payload`
   },
   // The `extraReducers` field lets the slice handle actions defined elsewhere,
   // including actions generated by createAsyncThunk or in other slices.
   extraReducers: (builder) => {
      builder
         .addCase(addAsync.pending, (state) => {
            state.status = "loading";
         })
         .addCase(addAsync.fulfilled, (state, action) => {
            state.status = "idle";
            //state.value += action.payload;
         })
         .addCase(addAsync.rejected, (state) => {
            state.status = "failed";
         });
   },
});

export const { setSession, clearSession } = sessionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.session.value)`
export const selectSession = (state: RootState) => state.session.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const sessionInit =
   (user: any): AppThunk =>
   (dispatch) => {
      dispatch(setSession(user));
   };

export default sessionSlice.reducer;
