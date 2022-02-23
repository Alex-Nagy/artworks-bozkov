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


//const myBackEndURL = "http://localhost:4000/api";
const myBackEndURL = "http://frontend-bozkov.duckdns.org:4000/api";
// const farBackEndURL = "https://artwork-backend.herokuapp.com";
const farBackEndURL = "http://backend-bozkov.duckdns.org/artwork";

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

  const [hasMessage, setHasMessage] = useState(false);
 
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

  const clearSearch = async (e) => {
    e.preventDefault(e);
    setSearchString("");
    const data = await getData(1, "", "title");
    setPages(data.info.pages);
    setRecords(data.records);
  }
  
  const search = () => {
    const init = async () => {
      setRecords([])
      setPageNumber(1);
      const data = await getData(1, searchString);
      setPages(data.info.pages);
      setRecords(data.records);

    };
    if (searchString.length < 3) setSearchString("");
    init();
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      setHasMessage('I am trying to login. Please wait!');
      const response = await http.post(myBackEndURL+'/login', {
      }, {
        headers: {
          authorization: authUser + ':::' + authPassword
        }
      })
      setHasMessage(false);
      localStorage.setItem('sessionId', response.data);
      localStorage.setItem('user', authUser);
      setLoggedIn(true);
      setHasMessage(false);
    } catch (err) {
      return setHasMessage('Wrong username or password.');
    }
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      setHasMessage('I am trying to register. Please wait!');
      await http.post(myBackEndURL+'/signup', {
        name: name,
        password: password
      })
      setHasMessage("Successfull registration.");
      setName("");
      setPassword("");
      //Átirányítani a signIn-re.
    } catch (err) {
      if (!err.response) return setHasMessage('Ooops...Something went wrong.')
      if (err.response.status === 409) {
        setHasMessage('User already exist.')
      }
      if (err.response.status === 400) {
        setHasMessage('Missing credentials.')
      }
    }
  }

  const signOut = async() => {
    try {
      setHasMessage('I am trying to logging out. Please wait!');
      await http.delete(myBackEndURL+'/api/logout', {
        headers: {
          authorization: localStorage.getItem("sessionId"),
        },
      }, {});
      setHasMessage(false);
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
      setHasMessage('Upload in progress. Please wait!');
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
        setHasMessage("Upload error.");
      }
    } catch (err) {
      setHasMessage("Ooops! Something went wrong.");
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
          setHasMessage("Artwork added.");
        } catch (err) {
          setHasMessage("File system error.");
        }
      // setHasMessage('Upload in progress. Please wait!');
    }
  };

  return (
    // <div className="App">
    <>
      <BrowserRouter>
        <div className="stickyHeader">
          <Header authUser={authUser} signOut={signOut} loggedIn={loggedIn} searchString={searchString} setSearchString={setSearchString} search={search} />
        </div>
        { hasMessage && <div className="message" onClick={() => setHasMessage(false)} title="Click to close message!">{hasMessage}</div>}
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
                clearSearch={clearSearch}
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
