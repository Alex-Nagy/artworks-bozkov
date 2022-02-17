import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <Link to='/' className='link'><h1>Artworks</h1></Link>
      <nav>
        <ul>
          <li><Link to='browse' className='link'><button>Browse artworks</button></Link></li>
          <li><Link to='myCollection' className='link'><button>My collection</button></Link></li>
          <li><Link to='logIn' className='link'><button>Sign In</button></Link></li>
          {/* <li><Link to='register' className='link'><button>Register</button></Link></li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
