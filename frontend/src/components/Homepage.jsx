import React, { useEffect, useState } from 'react';
import { getData } from '../api';
import Card from './Card';

const Homepage = () => {

  const [ records, setRecords ] = useState([]);
  const [ pageNumber, setPageNumber ] = useState(1);

  useEffect(() => {
    const init = async () => {
      const data = await getData(pageNumber);
      setRecords(data.records);
      console.log(data);
    };
    init();
  }, []);

  const increase = async () => {
    setPageNumber(pageNumber+1);
    const newRecords = await getData(pageNumber);
    setRecords([...records, ...newRecords.records]);
  };

  return (
    <div className='artRecords'>
      { records.length ? 
        records.map((record) => <Card key={record.id} record={record} />) : 
        <p className='loading'>Loading...</p>
      }
      <button className='loader' onClick={increase}>+</button>
    </div>
  );
};

export default Homepage;