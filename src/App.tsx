import React from "react"; // Import React
import "./App.css";
import { Suspense, useEffect } from "react"; // Remove useMemo as it's not used
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./components/themes/Theme";
import { useAppSelector } from "./app/hooks";
import { SessionState } from "./features/session/session";
import ProtectedRoute from "./utilities/ProtectedRoute";
import Employees from "./pages/Employees/Employees";
import Login from "./pages/Login";
import Profile from "./pages/Profile/Profile";
import CssBaseline from "@mui/material/CssBaseline";
import Schema from "./pages/Schema";
import Departments from "./pages/Departments";
import Managers from "./pages/Managers";
import Salaries from "./pages/Salaries";
import Todo from "./pages/Todo";
import Titles from "./pages/Titles";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
// import FallbackComponent from "./components/FallbackComponent";
// import ErrorBoundary from "./components/ErrorBoundary";

export const App = () => {
   const session: any = useAppSelector((state) => state.session);

   useEffect(() => {
      console.log("ok");
   }, [session.darkMode]);

   return (
      <div style={{ minHeight: 800 }}>
         <Suspense fallback={<div>Loading...</div>}>
            <ThemeProvider theme={!session.darkMode ? lightTheme : darkTheme}>
               <CssBaseline />
               <Routes>
                  <Route path='/' element={<Navigate replace to='/login' />} />
                  <Route path='/login' element={<Login />} />

                  <Route element={<ProtectedRoute />}>
                     <Route path='/dashboard' element={<Dashboard />} />
                     <Route path='/employees' element={<Employees />} />
                     <Route path='/departments' element={<Departments />} />
                     <Route path='/managers' element={<Managers />} />
                     <Route path='/salaries' element={<Salaries />} />
                     <Route path='/titles' element={<Titles />} />
                     <Route path='/todo' element={<Todo />} />
                     <Route path='/users' element={<Users />} />
                     <Route path='/profile' element={<Profile />} />
                     <Route path='/schema' element={<Schema />} />
                     <Route path='/settings' element={<Settings />} />
                  </Route>
               </Routes>
            </ThemeProvider>
         </Suspense>
      </div>
   );
};

export default App;

// export default (
//    <ErrorBoundary fallbackComponent={<FallbackComponent />}>
//       <App />
//    </ErrorBoundary>
// );
