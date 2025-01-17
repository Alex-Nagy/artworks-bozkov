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
// const myBackEndURL = "http://frontend-bozkov.duckdns.org:4000/api";
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

  const [itemToDisplay, setItemToDisplay] = useState(false);

  const itemClose = () => {
    setItemToDisplay(false);
  }
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
    const data = await getData(1, "");
    setPages(data.info.pages);
    setRecords(data.records);
    setHasMessage(false);
  }
  
  const search = () => {
    const init = async () => {
      setRecords([])
      setPageNumber(1);
      const data = await getData(1, searchString);
      if (data.info.totalrecords) {
        setPages(data.info.pages);
        setRecords(data.records);
        setHasMessage(false);
      } else {
        setPages(1);
        setRecords([]);
        setHasMessage('No result.');
      }
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
      setAuthPassword("");
    } catch (err) {
      setAuthPassword("");
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
      setAuthUser("");
      setAuthPassword("");
    } catch (err) {
      if (!err.response) return setHasMessage('Unsuccessfull registration. Please try again.')
      if (err.response.status === 409) {
        setHasMessage('User already exists. Please, choose another email address.')
      }
      if (err.response.status === 400) {
        setHasMessage('Missing credentials. Please, fill out the form correctly.')
      }
    }
  }

  const signOut = async() => {
    try {
      setHasMessage('I am trying to logging out. Please wait!');
      await http.delete(myBackEndURL+'/logout', {
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
      setHasMessage(false);
    }
  }

  const increase = async () => {
    setPageNumber(pageNumber + 1);
  };

  const addToMyCollection = async (artwork) => {

    let uuid = false;
    try {
      setHasMessage('Check collection. Please wait!');
      const response = await http.get(myBackEndURL+"/mycollection", 
      {
        headers: {
          authorization: localStorage.getItem('sessionId'),
        },
      })
      const data = await response
      let duplicated = false;
      if (data.data && data.data.length > 0) {
        console.log(data.data)
        for (const item of data.data) {
          if (item.id === artwork.id) duplicated = true;
          console.log(item.id)
          console.log(artwork)
        }
      }
      if (!duplicated) {
        try {
          setHasMessage('Upload in progress. Please wait!');
          const downloadedFile = await http.get(artwork.primaryimageurl, { responseType: 'blob' }, {}) 
          try {
            let fileToUpload = new FormData();
            fileToUpload.append("file", downloadedFile.data);
            await http.post(
              myBackEndURL+'/upload',
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
          setHasMessage("Can't connect to the server. Please, try again!");
        }
      } else {
        setHasMessage("This record exists in your collection.");
      }
    } catch (err) {
      setHasMessage("Can't connect to the server. Please, try again!");
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
          setHasMessage("File system error. Please, try again!");
        }
      // setHasMessage('Upload in progress. Please wait!');
    }
  };

  // const showPicture = (e) => {
	// 	setItemToDisplay(e);
  // }

  return (
    <>
    {/* <div className="App"> */}
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
                itemToDisplay={itemToDisplay}
                setItemToDisplay={setItemToDisplay}
                itemClose={itemClose}
                myBackEndURL={myBackEndURL}
              />
            }
          />
          <Route
            path="details/:id"
            element={<Details addToMyCollection={addToMyCollection} loggedIn={loggedIn} itemToDisplay={itemToDisplay} setItemToDisplay={setItemToDisplay} itemClose={itemClose} myBackEndURL={myBackEndURL} />}
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
                hasMessage={hasMessage}
                setHasMessage={setHasMessage}
              />
            }
          />
        </Routes>
      </BrowserRouter>
      {itemToDisplay !== false &&
			<div className="imageItem" onClick={itemClose}>
				<img src={itemToDisplay} alt="viewer"/>;
			</div>
		}
    {/* </div> */}
    </>
  );
}

export default App;
