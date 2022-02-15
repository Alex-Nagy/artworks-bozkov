import React, { useEffect, useState } from 'react';
import './App.css';
import { getData } from './api';
import Card from './components/Card';

function App() {
  const [records, setRecords] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState("/");
  const [query, setQuery] = useState("");

  const increase = async () => {
    setPageNumber(pageNumber+1);
    const newRecords = await getData(pageNumber);
    setRecords([...records, ...newRecords.records]);
  }

  /*
  const isBottom = (el) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }
  
  const scrolling = () => {
    const wrappedElement = document.getElementById('root');
    if (isBottom(wrappedElement)) {
      increase();
      document.removeEventListener('scroll', scrolling);
    }
  };
*/

  useEffect(() => {
    const init = async() => {
      const data = await getData(1);
      setRecords(data.records);
    };
    init();
    // document.addEventListener('scroll', scrolling);
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Artwork</h1>
        <nav>
          <ul>
            <li><button onClick={() => setPage("/")} >Home</button></li>
            <li><button>My collection</button></li>
            <li><button>Sign in</button></li>
            <li><button>Register</button></li>
          </ul>
        </nav>
      </header>
      <main>
        { page === "/" && 
          <div className='artRecords'>
            {records ? records.map((record, index) => <Card record={record} key={index} />) : <p>Loading...</p>}
          </div>
        }
        <button className="loader" onClick={increase}>+</button>
      </main>
    </div>
  );
}

export default App;
