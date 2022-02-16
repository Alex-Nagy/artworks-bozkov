import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <Link to='/' className='link'><h1>Artworks</h1></Link>
      <nav>
        <Link to='myCollection' className='link'>My collection</Link>
        <Link to='logIn' className='link'>Log In</Link>
        <Link to='register' className='link'>Register</Link>
      </nav>
    </div>
  );
};

export default Header;
