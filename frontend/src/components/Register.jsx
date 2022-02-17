import React from 'react';
import http from 'axios';

const Register = ({ name, password, setName, setPassword }) => {

  const register = async () => {
    try {
      await http.post('http://localhost:4000/api/signup', {
        name: name,
        password: password
      })
      alert("Successfull registration");
      setName("");
      setPassword("");
      // window.history.push("/collection");
      // setSection("login");
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 409:
            alert("Oooops. Conflict. User already exists.");
            break;
          case 400:
            alert("Oooops. Missing credentials.");
            break;
          default:
            alert("Oooops. Something went wrong");
            break;
        }
      } else {
        alert("Oooops.");
      }
    }
  }
  
  return (
    <section>
        <h1>Registration</h1>
        <input name="name" type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="name" />
        <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password" />
        <button onClick={register}>Register</button>
    </section>
  )
}

export default Register