import React, { useState, useEffect } from 'react'
import http from 'axios';
import MyCard from './MyCard';
import Spinner from '../img/loading.gif';

const MyCollection = ({ authUser, myBackEndURL, farBackEndURL, loggedIn }) => {

  const [collection, setCollection] = useState(null);
    
  const fetchCollected = async(artwork) => {
    // 
   const response = await http.get(myBackEndURL+"/mycollection", 
    {
      headers: {
        authorization: localStorage.getItem('sessionId'),
      },
    })
    const data = await response
    console.log(data);  // 401 Unauthorized ??
    // if (data.data.length)
    setCollection(data.data)
  }

  useEffect(() => {
    console.log(loggedIn)
    if (!loggedIn) {
      setCollection([])
      return false;
    }
    fetchCollected()
  }, [])
  
  return (
    <section className="myCollection">
      <h1>My Collection</h1>
      <div className='artRecords'>
      { collection ?
        collection.map((collectionItem, index) => (
          <MyCard key={index} record={collectionItem} farBackEndURL={farBackEndURL} loggedIn={loggedIn} />
        )) :
        <img src={Spinner} alt="Loading..." className='spinner'/>
      }
      </div>
      {
        loggedIn && collection && collection.length === 0 && <p className="emptyCollection">Your collection is empty.</p>
      }
      {
        !loggedIn && <p className="emptyCollection">Please, login first.</p>
      }
    </section>
  )
}

export default MyCollection