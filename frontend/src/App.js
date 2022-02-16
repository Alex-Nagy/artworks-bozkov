import React, { useEffect, useState } from "react";
import "./App.css";
import { getData } from "./api";
import Card from "./components/Card";
import SignInSide from "./components/SignInSide";

function App() {
  const [records, setRecords] = useState(null);
  const [loginClicked, setLoginClicked] = useState(false);

  useEffect(() => {
    const init = async () => {
      const data = await getData();
      console.log(data);
      setRecords(data.records);
    };
    init();
  }, []);

  const loginClickHandler = () => { 
    setLoginClicked(!loginClicked)
   }

  return (
    <div>
      <nav>
        <button onClick={loginClickHandler} className="login-btn">Log in</button>
      </nav>
      {loginClicked && <SignInSide />} 
      <h1>Artwork</h1>
      <div className="artRecords">
        {records ? (
          records.map((record, index) => <Card record={record} key={index} />)
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
