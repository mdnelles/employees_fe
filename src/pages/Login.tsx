import * as React from "react";
import "../App.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSession } from "../features/session/sessionSlice";
import { isValidEmail, isValidPassword } from "../utilities/validate";
import { apiPost } from "../utilities/ApiRequest";
import { setSnackbar } from "../features/snackbar/snackbarSlice";
import GitHubIcon from "@mui/icons-material/GitHub";

import { msg } from "../utilities/gen";
import { useEffect } from "react";
import { SnackbarState } from "../features/snackbar/snackbar";
import SnackCube from "../components/Snackbar/SnackCube";
import Paper from "@mui/material/Paper";

export default function Login() {
   const navigate = useNavigate();
   const dis = useAppDispatch();
   const session: any = useAppSelector((state) => state.session);
   const snackbar: SnackbarState = useAppSelector((state) => state.snackbar);
   const speed = session.speed;
   const [loading, setLoading] = React.useState(false);
   const [success, setSuccess] = React.useState(false);

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSuccess(false);
      setLoading(true);
      const data = new FormData(event.currentTarget);

      const email = data.get("email") || "";
      const password = data.get("password");

      if (isValidEmail(data.get("email")) && isValidPassword(password)) {
         dis(setSnackbar(msg(`Testing Credentials...`, "info")));
         const res = await apiPost("/users_login", { email, password });

         setTimeout(() => {
            // allow animation to finish
            if (res.data.err) {
               dis(setSnackbar(msg(`login failed: ${email}`, "error")));
            } else {
               const user = {
                  email,
                  token: res.data.token,
                  lastLoginAt: Date.now(),
                  createdAt: 1661467411061,
               };
               dis(setSession({ ...session, user }));
               setTimeout(
                  () => dis(setSnackbar(msg(`Login success `, "success"))),
                  speed + 200
               );
               setTimeout(() => navigate(`/dashboard`), speed * 2 + 250);
            }
            setSuccess(true);
            setLoading(false);
         }, session.speed * 1000 + 10);
      } else {
         setSuccess(true);
         setLoading(false);
         dis(setSnackbar(msg(`Please enter valid email & password `, "error")));
      }
   };

   useEffect(() => {
      console.log("UE");
   }, [snackbar, session]);

   return (
      <>
         <div className='vertical-center center-outer'>
            <div className='center-inner'>
               <Paper>
                  <Container component='main' maxWidth='lg'>
                     <CssBaseline />
                     <Box
                        sx={{
                           marginTop: 8,
                           display: "flex",
                           flexDirection: "column",
                           alignItems: "center",
                        }}
                     >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                           <LockOutlinedIcon />
                        </Avatar>
                        <Typography component='h1' variant='h5'>
                           Sign in
                        </Typography>
                        <Box
                           component='form'
                           onSubmit={handleSubmit}
                           noValidate
                           sx={{ mt: 1 }}
                        >
                           <TextField
                              margin='normal'
                              defaultValue={"demo@emplo.yees"}
                              required
                              fullWidth
                              id='email'
                              label='Email Address'
                              name='email'
                              autoComplete='email'
                              autoFocus
                           />
                           <TextField
                              margin='normal'
                              required
                              fullWidth
                              type='password'
                              name='password'
                              label='Password'
                              id='password'
                              defaultValue={"f98h34F#$FT"}
                              autoComplete='current-password'
                           />
                           <Box
                              sx={{
                                 position: "relative",
                                 marginBottom: 2,
                              }}
                           >
                              <Button
                                 type='submit'
                                 fullWidth
                                 variant='contained'
                                 sx={{ mt: 3, mb: 2, height: 50 }}
                                 disabled={loading}
                                 onClick={() => handleSubmit}
                              >
                                 Sign In
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
                           </Box>
                        </Box>
                     </Box>
                     <Box>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                           <div style={{ flex: 1, minWidth: 250, padding: 10 }}>
                              <Button
                                 variant='outlined'
                                 fullWidth={true}
                                 href='https://github.com/mdnelles/employees_fe'
                              >
                                 <GitHubIcon sx={{ paddingRight: 1 }} /> Source
                                 Code Client
                              </Button>
                           </div>

                           <div style={{ flex: 1, minWidth: 250, padding: 10 }}>
                              <Button
                                 variant='outlined'
                                 fullWidth={true}
                                 href='https://github.com/mdnelles/employees.neio.server'
                              >
                                 <GitHubIcon sx={{ paddingRight: 1 }} /> Source
                                 Code Server
                              </Button>
                           </div>
                        </div>
                     </Box>
                  </Container>
               </Paper>
            </div>
         </div>
         <SnackCube />
      </>
   );
}
