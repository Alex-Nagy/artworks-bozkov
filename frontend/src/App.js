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
import http from 'axios';

function App() {

  const [ records, setRecords ] = useState([]);
  const [ pageNumber, setPageNumber ] = useState(1);

  const [name, setName] =useState("");
  const [password, setPassword] =useState("");
  const [todo, setTodo] =useState("");
  const [authUserName, setAuthUserName] =useState("");
  const [authPassword, setAuthPassword] =useState("");
  const [section, setSection] = useState("registration");

  useEffect(() => {
    const init = async () => {
      const newRecords = await getData(pageNumber);
      setRecords([...records, ...newRecords.records]);
      };
    init();
    
  }, [pageNumber]);
/*
  useEffect(() => {
    const user = localStorage.getItem('user');
    const password = localStorage.getItem('password');
    if (!user || !password) return;
    setAuthUserName(user);
    setAuthPassword(password);
    setSection("login");
  }, []);
*/
  const signUp = async () => {
    try {
      await http.post('http://localhost:4000/api/signup', {
        name: name,
        password: password
      })
      alert("Successfull registration");
      // setName("");
      // setPassword("");
//      setSection("login");
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 409:
            alert("Oooops. Conflict. User already exists.");
            break;
          case 400:
            alert("Oooops. Missing credentials.");
            break;
          default:
            alert("Oooops. Something went wrong");
            break;
        }
      } else {
        alert("Oooops.");
      }
    }
  }

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
          {/* <Route path='logIn' element={<LogIn name={name} password={password} onNameChange={setName} onPasswordChange={setPassword} onSubmit={signUp} />} /> */}
          <Route path='register' element={<Register name={name} password={password} setName={setName} setPassword={setPassword} signUp={signUp} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;