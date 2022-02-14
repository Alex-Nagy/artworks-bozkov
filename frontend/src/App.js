import React, { useEffect, useState } from 'react';
import './App.css';
import { getData } from './api';
import Paginator from './components/Paginator.jsx';

function App() {
  const [records, setRecords] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  let data={};
  let max=0;

  const decreasePageNum = () => {
    pageNum > 1 ? setPageNum(pageNum-1) : setPageNum(pageNum);
  }

  const increasePageNum = () => {
    pageNum < max ? setPageNum(pageNum+1) : setPageNum(pageNum);
  }

  useEffect(() => {
    const init = async() => {
      data = await getData(1);
      console.log(data);
      setRecords(data.records);
      max=data.info.pages;
    };
    init();
  }, [pageNum]);

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
      {records ?
        <Paginator pageNum={pageNum} onForward={increasePageNum} onBackward={decreasePageNum} max={max} /> : ""
      }
    </div>
  );
}

export default App;
