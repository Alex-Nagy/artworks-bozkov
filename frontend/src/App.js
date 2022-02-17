import React, { useEffect, useState } from "react";
import { getData } from "./api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import http from "axios";

import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Browse from "./components/Browse";
import Details from "./components/Details";
import MyCollection from "./components/MyCollection";
import LogIn from "./components/LogIn";
import Register from "./components/Register";

function App() {
  const [records, setRecords] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [authUser, setAuthUser] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  // const [artwork, setArtwork] = useState({});

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
  }, []);


  const signOut = () => {
    localStorage.removeItem('user', authUser)
    localStorage.removeItem('password', authPassword)

    setAuthUser('');
    setAuthPassword('');
  }

  const increase = async () => {
    setPageNumber(pageNumber + 1);
  };

  const addToMyCollection = async (artwork) => {
    console.log("Added to my collection");
    console.log(authUser);
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
      alert("todo added");
      //setTodo('')
    } catch (err) {
      alert("Ooops something went wrong");
    }
  };

  // console.log(records);
  console.log(authUser);

  return (
    <div className="App">
      <BrowserRouter>
        <Header authUser={authUser} signOut={signOut} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="browse"
            element={
              <Browse
                records={records}
                onChange={increase}
                addToMyCollection={addToMyCollection}
              />
            }
          />
          <Route
            path="details/:id"
            element={<Details addToMyCollection={addToMyCollection} />}
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
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
