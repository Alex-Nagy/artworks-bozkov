import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({authUser, signOut, loggedIn}) => {
  return (
    <header>
      <Link to='/' className='link'><h1>Artworks</h1></Link>
      <nav>
        <ul>
          <li><Link to='browse' className='link'><button>Browse Artworks</button></Link></li>
          {loggedIn &&
            <li><Link to='myCollection' className='link'><button>My Collection</button></Link></li>
          }
          {loggedIn ? 
            <li><Link to='/' className='link'><button onClick={signOut} >Sign Out</button></Link></li> :
            <li><Link to='signIn' className='link'><button>Sign In</button></Link></li>
          }
        </ul>
      </nav>
      {loggedIn && <p>{authUser}</p>}
    </header>
  );
};

export default Header;
