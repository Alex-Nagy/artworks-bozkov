import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import List from './components/List';
import Details from './components/Details';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Header /> 
        <Routes>
          <Route path='/' element={<List />} />
          <Route path='details/:id' element={<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;


