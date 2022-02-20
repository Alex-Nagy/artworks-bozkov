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


// const cors = require("cors");
// app.options("*", cors({ origin: 'http://localhost:8000', optionsSuccessStatus: 200 }));
// http.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

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
      await http.post(myBackEndURL+'/login', {
      }, {
        headers: {
          authorization: authUser + ':::' + authPassword
        }
      })
      localStorage.setItem('user', authUser)
      localStorage.setItem('password', authPassword)
      setLoggedIn(true);
    } catch (err) {
      alert('Wrong username or password');
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

      localStorage.setItem('user', name);
      localStorage.setItem('password', password);
      setName("");
      setPassword("");
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
    // console.log("Added to my collection");
    try {
      const downloadedFile = await http.get(artwork.primaryimageurl, { responseType: 'blob' }, {}) 
      console.log(downloadedFile);

      try {
        await http.post(farBackEndURL+'/upload',{
          file: downloadedFile
        }, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*' 
          }
        }).then(data => {
          console.log(data)
          // try {
          //   await http.post(
          //     myBackEndURL+"/mycollection",
          //     {
          //       artwork: artwork
          //     },
          //     {
          //       headers: {
          //         authorization: authUser + ":::" + authPassword,
          //       },
          //     }
          //     );
          //     alert("Artwork added");
          //   } catch (err) {
          //     alert("File system error.");
          //   }
        })
      } catch (err) {
        console.log(err);
        alert("Upload error.");
      }

      // try {
      //   await http.post(
      //     myBackEndURL+"/mycollection",
      //     {
      //       artwork: artwork
      //     },
      //     {
      //       headers: {
      //         authorization: authUser + ":::" + authPassword,
      //       },
      //     }
      //     );
      //     alert("Artwork added");
      //   } catch (err) {
      //     alert("File system error.");
      //   }

    } catch (err) {
      alert("Ooops! Something went wrong");
    }
  };

  return (
    <div className="App">
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
          <Route path="myCollection" element={<MyCollection authUser={authUser} authPassword={authPassword} myBackEndURL={myBackEndURL} loggedIn={loggedIn} />} />
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
    </div>
  );
}

export default App;
