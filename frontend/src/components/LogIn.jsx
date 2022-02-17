import React from 'react';
import http from 'axios';
import { Link } from 'react-router-dom';

const LogIn = ({ authUser, authPassword, setAuthUser, setAuthPassword }) => {

  const login = async () => {
    try {
      await http.post('http://localhost:4000/api/login', {

      }, {
        headers: {
          authorization: authUser + ':::' + authPassword
        }
      })
      alert('Successfully login')
      //console.log("Belépve")
      // setSectionToAppear("todos")
      localStorage.setItem('user', authUser)
      localStorage.setItem('password', authPassword)
    } catch (err) {
      alert('Wrong username or password');
    }
  };

  return (
    <section>
      <h1>Login</h1>
      <input type="text" placeholder="username" value={authUser} onChange={e => setAuthUser(e.target.value)} />
      <input type="password" placeholder="password" value={authPassword} onChange={e => setAuthPassword(e.target.value)} />
      {/* <button onClick={() => setSectionToAppear("registration")}>I don't have an account</button> */}
      <button onClick={login}>Log in</button>
      <h2>If you haven't registered yet, please fill out the registration form.<Link to='/register' className='link'><button>Register</button></Link></h2>
    </section>
  )
}

export default LogIn


// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// import http from "axios";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit">Team Bozhkov</Link> {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const theme = createTheme();

// export default function LogIn(props) {
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     // eslint-disable-next-line no-console
//     console.log({
//       email: data.get("email"),
//       password: data.get("password"),
//     });

//     // backendre küldés
//     try {
//       await http.post("http://localhost:4000/api/signup", {
//         email: data.get("email"),
//         password: data.get("password"),
//       });
//       alert("Successfully registered ✅");
//     } catch (err) {
//       if (!err.response) {
//         alert("Oops... Something went wrong 🙁");
//       }
//       if (err.response.status === 409) {
//         alert("User already exists");
//       }
//       if (err.response.status === 400) {
//         alert("Missing credentials");
//       }
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Grid container component="main" sx={{ height: "calc(100vh - 80px)", width: "100vw" }}>
//         <CssBaseline />
//         <Grid item xs={false} sm={4} md={7} sx={{
//             backgroundImage:
//               "url(https://images.unsplash.com/photo-1564399579883-451a5d44ec08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1037&q=80)",
//             backgroundRepeat: "no-repeat",
//             backgroundColor: (t) =>
//               t.palette.mode === "light"
//                 ? t.palette.grey[50]
//                 : t.palette.grey[900],
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         />
//         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square backgroundColor={"ghostwhite"}>
//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
//               {/* <LockOutlinedIcon /> */}
//             </Avatar>
//             <Typography color="primary" component="h1" variant="h5">
//               Sign in
//             </Typography>
//             <Box
//               component="form"
//               noValidate
//               onSubmit={handleSubmit}
//               sx={{ mt: 1 }}
//             >
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 autoFocus
//                 onChange={props.onNameChange}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 onChange={props.onPasswordChange}
//               />
//               <FormControlLabel
//                 control={<Checkbox value="remember" color="primary" />}
//                 label="Remember me"
//               />
//               <Button
//                 type="submit"
//                 color="success"
//                 size="large"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//                 onClick={props.onSubmit}
//               >
//                 Sign In
//               </Button>
              
//               <Copyright sx={{ mt: 5 }} />
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// }
