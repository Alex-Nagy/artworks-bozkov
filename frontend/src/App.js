import React, { useEffect, useState } from 'react';
import './App.css';
import { getData } from './api';

function App() {
  const [records, setRecords] = useState(null);

  useEffect(() => {
    const init = async() => {
      const data = await getData();
      console.log(data);
      setRecords(data.records);
    };
    init();
  }, []);

  return (
    <div>
      <h1>Artwork</h1>
      <div className='artRecords'>
        {records ?
          records.map(record => (
          <div key={record.id} className="artItem" >
            {record.primaryimageurl ? 
              <img alt={record.id} src={record.primaryimageurl} /> : <p>No image</p>}
            <h3>{record.title}</h3>
            <p className="classification"><span className='label'>Classification</span>{record.classification}</p>
            <p className="workType"><span className='label'>Work type</span>{record.worktypes.map((item, index) => item.worktype)}</p>
            <p className="century">{record.century}</p>
          </div>
          )) : 
          <p>Loading...</p>
        }
      </div>
    </div>
  );
}

export default App;
