import React, { useEffect, useState } from 'react';
import { getData } from './api';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Homepage from './components/Homepage';
import Browse from './components/Browse';
import Details from './components/Details';
import MyCollection from './components/MyCollection';
import LogIn from './components/LogIn';
import Register from './components/Register';

function App() {

  const [ records, setRecords ] = useState([]);
  const [ pageNumber, setPageNumber ] = useState(1);

  useEffect(() => {
    const init = async () => {
      const newRecords = await getData(pageNumber);
      setRecords([...records, ...newRecords.records]);
      };
    init();
  }, [pageNumber]);

  const increase = async () => {
    setPageNumber(pageNumber+1);
  };

  console.log(records);

  return (
    <div className="App">
      <BrowserRouter>
        <Header /> 
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='browse' element={<Browse records={records} onChange={increase} />} />
          <Route path='details/:id' element={<Details />} />
          <Route path='myCollection' element={<MyCollection />} />
          <Route path='logIn' element={<LogIn />} />
          <Route path='register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;