import React, { useEffect, useState } from 'react';
import './App.css';
import { getData } from './api';
import Card from './components/Card';

function App() {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);

  const increase = async () => {
    setPage(page+1);
    const newRecords = await getData(page);
    setRecords([...records, ...newRecords.records]);
    // console.log(records);
  }

  const isBottom = (el) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }
  
  const trackScrolling = () => {
    const wrappedElement = document.getElementById('root');
    if (isBottom(wrappedElement)) {
      increase();
      // console.log('header bottom reached');
      document.removeEventListener('scroll', trackScrolling);
    }
  };

  useEffect(() => {
    const init = async() => {
      const data = await getData(1);
      setRecords(data.records);
    };
    init();
    document.addEventListener('scroll', trackScrolling);
  }, []);

  return (
    <div>
      <h1>Artwork</h1>
      <div className='artRecords'>
        {records ? records.map((record, index) => <Card record={record} key={index} />) : <p>Loading...</p>}
        <button onClick={increase}>+</button>
      </div>
    </div>
  );
}

export default App;
