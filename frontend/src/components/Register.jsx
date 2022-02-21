import React, { useState } from 'react';

const Register = ({ name, password, setName, setPassword, setLoggedIn, register }) => {

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errorMessages = errors;

    const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
    switch (name) {
      case 'password': 
        errorMessages.password = value.length >= 6 ? '' : 'The password must be at least 6 characters long!';
        break;
      case 'email': 
        errorMessages.email = regex.test(value) ? '' : 'Invalid e-mail address!';
        break;
      default:
        break;
    }
    setErrors({errorMessages, [name]: value})
  }
  console.log(errors);
  return (
    <section className="register">
        <h1>Registration</h1>
        <form onSubmit={(e) => register(e)}>
        <input name="email" type="email" onChange={(e) => {
          setName(e.target.value)
          // handleChange(e)
        }} value={name} placeholder="email" required />
        {errors.email && errors.email.length > 0 && <span className='error'>{errors.email}</span>}
        <input name="password" type="password" onChange={(e) => {
          setPassword(e.target.value)
          // handleChange(e)
        }} value={password} placeholder="password" required />
        {errors.password && errors.password.length > 0 && <span className='error'>{errors.password}</span>}
        <button>Register</button>
        </form>
    </section>
  )
}

export default Register