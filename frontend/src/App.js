import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import http from "axios";
import { getData } from "./api";
import "./App.css";

import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Browse from "./components/Browse";
import Details from "./components/Details";
import MyCollection from "./components/MyCollection";
import LogIn from "./components/LogIn";
import Register from "./components/Register";

const FormData = require("form-data");


const myBackEndURL = "http://localhost:4000/api";
// const farBackEndURL = "http://3.71.188.86/artwork";
const farBackEndURL = "https://artwork-backend.herokuapp.com";
// const farBackEndURL = "http://backend-bozkov.duckdns.org/artwork";

function App() {
  const [records, setRecords] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState(1);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  
  const [authUser, setAuthUser] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  
  const [loggedIn, setLoggedIn] = useState(false);
  
  const [searchString, setSearchString] = useState("");
  // const [tagTitle, setTagTitle] = useState("");

  useEffect(() => {
    const init = async () => {
      const newRecords = await getData(pageNumber, searchString);
      setPages(newRecords.info.pages);
      setRecords([...records, ...newRecords.records]);
    };
    init();
  }, [pageNumber]);

  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId');
    const user = localStorage.getItem("user");
    if (!sessionId || !user) return
    setAuthUser(user);
    setLoggedIn(true);
    //Itt átirányít a Browse artworks-re.
  }, [])

  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   const password = localStorage.getItem("password");
  //   if (!user || !password) return;
  //   setAuthUser(user);
  //   setAuthPassword(password);
  //   setLoggedIn(true);
  // }, []);

  const search = () => {
    const init = async () => {
      setRecords([])
      setPageNumber(1);
      const searchRecords = await getData(1, searchString);
      setPages(searchRecords.info.pages);
      setRecords([...searchRecords.records]);
    };
    if (searchString.length < 3) setSearchString("");
    init();
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await http.post(myBackEndURL+'/login', {
      }, {
        headers: {
          authorization: authUser + ':::' + authPassword
        }
      })
      localStorage.setItem('sessionId', response.data);
      localStorage.setItem('user', authUser);
      setLoggedIn(true);
    } catch (err) {
      return alert('Wrong username or password');
    }
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      await http.post(myBackEndURL+'/signup', {
        name: name,
        password: password
      })
      alert("Successfull registration");

      setName("");
      setPassword("");
      //Átirányítani a signIn-re.
    } catch (err) {
      if (!err.response) return alert('Ooops...Something went wrong')
      if (err.response.status === 409) {
        alert('User already exist')
      }

      if (err.response.status === 400) {
        alert('Missing credentials')
      }
    }
  }

  const signOut = async() => {
    try {
      await http.delete('http://localhost:4000/api/logout', {
        headers: {
          authorization: localStorage.getItem("sessionId"),
        },
      }, {});
    } catch (err) {
    } finally {
      localStorage.removeItem('sessionId');
      setAuthUser('')
      setAuthPassword('')
      setLoggedIn(false);
    }
  }

  const increase = async () => {
    setPageNumber(pageNumber + 1);
  };

  const addToMyCollection = async (artwork) => {
    let uuid = false;
    try {
      const downloadedFile = await http.get(artwork.primaryimageurl, { responseType: 'blob' }, {}) 
      try {
        let fileToUpload = new FormData();
        fileToUpload.append("file", downloadedFile.data);
        await http.post(
          farBackEndURL+'/upload',
          fileToUpload,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Access-Control-Allow-Origin': '*' 
            },
          }
        ).then(data => {
          uuid = data.data.uuid;
        })
      } catch (err) {
        console.log(err);
        alert("Upload error.");
      }
    } catch (err) {
      alert("Ooops! Something went wrong");
    }

    if (uuid) {
      artwork.uuid = uuid;
      try {
        await http.post(
          myBackEndURL+"/mycollection",
          {
            artwork: artwork
          },
          {
            headers: {
              authorization: localStorage.getItem("sessionId"),
            },
          }
          );
          alert("Artwork added");
        } catch (err) {
          alert("File system error.");
        }
    }
  };

  return (
    // <div className="App">
    <>
      <BrowserRouter>
        <div className="stickyHeader">
          <Header authUser={authUser} signOut={signOut} loggedIn={loggedIn} search={searchString} setSearch={setSearchString} />
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
                searchString={searchString}
                setSearchString={setSearchString}
                search={search}
                pageNumber={pageNumber}
                pages={pages}
              />
            }
          />
          <Route
            path="details/:id"
            element={<Details addToMyCollection={addToMyCollection} loggedIn={loggedIn} />}
          />
          <Route path="myCollection" element={<MyCollection authUser={authUser} myBackEndURL={myBackEndURL} farBackEndURL={farBackEndURL} loggedIn={loggedIn} />} />
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
                register={register}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    {/* </div> */}
    </>
  );
}

export default App;
