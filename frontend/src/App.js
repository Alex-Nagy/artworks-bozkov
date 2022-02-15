import React, { useEffect, useState } from "react";
import "./App.css";
import { getData } from "./api";
import Card from "./components/Card";

function App() {
  const [records, setRecords] = useState(null);

  useEffect(() => {
    const init = async () => {
      const data = await getData();
      console.log(data);
      setRecords(data.records);
    };
    init();
  }, []);

  return (
    <div>
      <nav>
        <button>Login</button>
      </nav>
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
