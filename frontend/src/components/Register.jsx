import React from 'react'

const Register = ({ name, password, setName, setPassword, signUp }) => {
  return (
    <>
        <h1>Registration</h1>
        <input name="name" type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="name" />
        <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password" />
        <button onClick={signUp}>Sign up</button>
    </>
  )
}

export default Register