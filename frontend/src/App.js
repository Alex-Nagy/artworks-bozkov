import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Homepage from './components/Homepage';
import Details from './components/Details';
import MyCollection from './components/MyCollection';
import LogIn from './components/LogIn';
import Register from './components/Register';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Header /> 
        <Routes>
          <Route path='/' element={<Homepage />} />
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


