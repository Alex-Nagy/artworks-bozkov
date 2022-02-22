import React from 'react';
import http from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LogIn = ({ authUser, authPassword, setAuthUser, setAuthPassword, setLoggedIn, login }) => {

  return (
    <section className="login">
      <h1>Sign In</h1>
      <form onSubmit={login}>
        <input type="email" name="email" placeholder="email" value={authUser} onChange={e => setAuthUser(e.target.value)} />
        <input type="password" placeholder="password" value={authPassword} onChange={e => setAuthPassword(e.target.value)} />
        <button>Sign In</button>
      </form>
      <h2 className="ifYou">If you haven't registered yet, please fill out the registration form.</h2>
      <Link to='/register' className='link'><button>Register</button></Link>
    </section>
  )
}

export default LogIn
