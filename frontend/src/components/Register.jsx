import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Register = ({ name, password, setName, setPassword, setLoggedIn, register, hasMessage, setHasMessage }) => {
  let navigate = useNavigate();
  // console.log(errors);
  const validateEmail = (e) => {
    const regex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/;
    // const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    let answer = regex.test(e.target[0].value);
    if (answer) { 
      register(e)
      navigate("/signIn")
      return true;
    } else {
      setHasMessage("Invalid email address!");
      return false;
    }
}

  return (
    <section className="register">
        <h1>Registration</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target[0].value)
          validateEmail(e)
        }}>
        <input name="email" type="email" onChange={(e) => setName(e.target.value)} value={name} placeholder="email" required />
        <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password" required  minLength="6" />
        <button>Register</button>
        </form>
    </section>
  )
}

export default Register