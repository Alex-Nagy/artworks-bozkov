import React, { useState } from 'react';
import http from 'axios';

const Register = ({ name, password, setName, setPassword, setLoggedIn, register }) => {
  
  // const register = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await http.post('http://localhost:4000/api/signup', {
  //       name: name,
  //       password: password
  //     })
  //     alert("Successfull registration");

  //     localStorage.setItem('user', name);
  //     localStorage.setItem('password', password);
  //     // setLoggedIn(true);
  //     setName("");
  //     setPassword("");
  //     // setLoggedIn(true);
  //     // window.history.push("/collection");
  //     // setSection("login");
  //   } catch (err) {
  //     if (err.response) {
  //       switch (err.response.status) {
  //         case 409:
  //           alert("Oooops. Conflict. User already exists.");
  //           break;
  //         case 400:
  //           alert("Oooops. Missing credentials.");
  //           break;
  //         default:
  //           alert("Oooops. Something went wrong");
  //           break;
  //       }
  //     } else {
  //       alert("Oooops.");
  //     }
  //   }
  // }

  return (
    <section className="register">
        <h1>Registration</h1>
        <form onSubmit={(e) => register(e)}>
        <input name="email" type="email" onChange={(e) => setName(e.target.value)} value={name} placeholder="email" required />
        <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password" required />
        <button>Register</button>
        </form>
    </section>
  )
}

export default Register