import React, { useEffect, useState } from 'react';
import './App.css';
import { getData} from './api';

function App() {
  const [records, setRecords] = useState(null);
  // const [images, setImages] = useState(null);

  useEffect(() => {
    const init = async() => {
      const data = await getData();
      // const imageData = await getImageData();
      console.log(data);
      // console.log(imageData);
      setRecords(data.records);
      // setImages(imageData.records);
    };
    init();
  }, []);

  return (
    <div>
      <h1>Hello</h1>
      {/* <div className='images'>
        {images ?
        images.map(image => (
        <div key={image.id}>
          <p>{image.id}</p>
          <img alt={image.id} src={image.baseimageurl}/>
        </div>
        )) : 
        <p>Loading...</p>}
      </div> */}
      <div className='records'>
        {records ?
        records.map(record => (
        <div key={record.id}>
          <p>{record.id}</p>
          <img alt={record.id} src={`https://ids.lib.harvard.edu/ids/iiif/${record.id}/full/full/0/default.jpg`}/> {/* A record.id nem jó a source-ba! */}
          <p>{record.title}</p>
          <p>{record.classification}</p>
          <p>{record.dated}</p>
        </div>
        )) : 
        <p>Loading...</p>}
      </div>
    </div>
  );
}

export default App;
