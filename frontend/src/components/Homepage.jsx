import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <section className="home">
      <h1>Create your own artwork gallery!</h1>
      {/* <img src={homepage}></img> */}
      <Link to='/register' className='link'><button>Register</button></Link>
    </section>
  );
};

export default Homepage;