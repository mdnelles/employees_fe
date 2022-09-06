import Box from "@mui/material/Box";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { EmployeesObj, EmployeesType } from "./types";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import { dia, rand } from "../../utilities/gen";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import { useForm } from "react-hook-form";
import { setEmployees } from "../../features/employees/employeesSlice";
import { setDialog } from "../../features/dialog/dialogSlice";

interface EmpEditProps {
   params: {
      row: any;
      table: string;
      uid: any;
   };
}

export default function EmpDetails(props: EmpEditProps): JSX.Element {
   const { register, handleSubmit } = useForm();
   const { row, table = "", uid = "" } = props.params;
   const [loading, setLoading] = React.useState(false);
   const [fields, setFields] = useState<any>(undefined);
   const dis = useAppDispatch();

   const init = useRef<boolean>(false);
   const session: any = useAppSelector(
      (state: { session: any }) => state.session
   );
   const employees: EmployeesType = useAppSelector(
      (state: any) => state.employees
   );
   const empArr: any = employees.arr;
   const token = session.user.token;
   let nam: string[] = [];

   useEffect(() => {
      if (fields !== undefined) {
         setLoading(true);
         console.log(fields);
         dis(
            setEmployees({
               ...employees,
               arr: empArr.map((e: { [x: string]: any }) =>
                  e[uid] === row[uid] ? { ...e, ...fields } : e
               ),
            })
         );
         dis(setDialog(dia(false, "", "", {})));
         setTimeout(() => {
            setLoading(false);
         }, 3000);
      }
   }, [fields]);

   for (const property in row) nam = [...nam, property.toString()];

   return (
      <Container component='main' maxWidth='lg' sx={{ padding: 3 }}>
         <AppBar position='static' enableColorOnDark>
            <Toolbar>
               <Typography
                  variant='h6'
                  component='div'
                  sx={{ flexGrow: 1, paddingLeft: 1 }}
               >
                  {" Edit " + table}{" "}
               </Typography>
            </Toolbar>
         </AppBar>
         <div style={{ padding: 5 }} />
         <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <form
               onSubmit={handleSubmit((data) =>
                  fields !== data ? setFields(data) : null
               )}
            >
               <Box sx={{ width: "100%", typography: "body1" }}>
                  <TableContainer>
                     <Table sx={{ padding: 1 }}>
                        <TableBody>
                           {!nam || !nam[0]
                              ? null
                              : nam.map((n) => (
                                   <TableRow hover tabIndex={-1} key={rand()}>
                                      <TableCell>
                                         {n
                                            .toString()
                                            .replaceAll("_", " ")
                                            .toUpperCase()}
                                      </TableCell>
                                      <TableCell>
                                         {n === uid ? (
                                            <Typography color='secondary'>
                                               {row[n]}
                                            </Typography>
                                         ) : (
                                            <TextField
                                               size='small'
                                               defaultValue={row[n]}
                                               id={n}
                                               label={n}
                                               variant='outlined'
                                               {...register(n)}
                                            />
                                         )}
                                      </TableCell>
                                   </TableRow>
                                ))}
                           <TableRow>
                              <TableCell colSpan={2}>
                                 <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    color='secondary'
                                    sx={{ mt: 1, mb: 1, height: 50 }}
                                    disabled={loading}
                                    onClick={() => handleSubmit}
                                 >
                                    Edit
                                 </Button>
                                 {loading && (
                                    <CircularProgress
                                       size={24}
                                       sx={{
                                          position: "absolute",
                                          top: "50%",
                                          left: "50%",
                                          marginTop: "-12px",
                                          marginLeft: "-12px",
                                       }}
                                    />
                                 )}
                              </TableCell>
                           </TableRow>
                        </TableBody>
                     </Table>
                  </TableContainer>
               </Box>
            </form>
         </Paper>
      </Container>
   );
}
