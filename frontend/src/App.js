import React, { useEffect, useState } from "react";
import { getData } from "./api";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import http from "axios";

import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Browse from "./components/Browse";
import Details from "./components/Details";
import MyCollection from "./components/MyCollection";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import Search from "./components/Search";

function App() {
  const [records, setRecords] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [authUser, setAuthUser] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  // const [artwork, setArtwork] = useState({});
  // const history = useNavigate();

  useEffect(() => {
    const init = async () => {
      const newRecords = await getData(pageNumber);
      setRecords([...records, ...newRecords.records]);
    };
    init();
  }, [pageNumber]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const password = localStorage.getItem("password");
    if (!user || !password) return;
    setAuthUser(user);
    setAuthPassword(password);
    setLoggedIn(true);
  }, []);

  const login = async () => {
    try {
      await http.post('http://localhost:4000/api/login', {

      }, {
        headers: {
          authorization: authUser + ':::' + authPassword
        }
      })
      // alert('Successfully login')
      //console.log("Betépve")
      // setSectionToAppear("todos")
      localStorage.setItem('user', authUser)
      localStorage.setItem('password', authPassword)
      setLoggedIn(true);
      // history.push('/mycollection');
    } catch (err) {
      alert('Wrong username or password');
    }
  };

  const signOut = () => {
    localStorage.removeItem('user', authUser)
    localStorage.removeItem('password', authPassword)

    setAuthUser('');
    setAuthPassword('');
    setLoggedIn(false);
  }

  const increase = async () => {
    setPageNumber(pageNumber + 1);
  };

  const addToMyCollection = async (artwork) => {
    console.log("Added to my collection");
    // console.log(authUser);
    try {
      await http.post(
        "http://localhost:4000/api/mycollection",
        {
          artwork: artwork,
        },
        {
          headers: {
            authorization: authUser + ":::" + authPassword,
          },
        }
      );
      alert("Artwork added");
      //setTodo('')
    } catch (err) {
      alert("Ooops something went wrong");
    }
  };

  // console.log(records);
  // console.log(authUser);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="stickyHeader">
          <Header authUser={authUser} signOut={signOut} loggedIn={loggedIn} />
          <Search />
        </div>
          <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="browse"
            element={
              <Browse
                records={records}
                onChange={increase}
                addToMyCollection={addToMyCollection}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="details/:id"
            element={<Details addToMyCollection={addToMyCollection} loggedIn={loggedIn} />}
          />
          <Route path="myCollection" element={<MyCollection />} />
          <Route
            path="signIn"
            element={
              <LogIn
                authUser={authUser}
                authPassword={authPassword}
                setAuthUser={setAuthUser}
                setAuthPassword={setAuthPassword}
                setLoggedIn={setLoggedIn}
                login={login}
              />
            }
          />
          <Route
            path="register"
            element={
              <Register
                name={name}
                password={password}
                setName={setName}
                setPassword={setPassword}
                setLoggedIn={setLoggedIn}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
