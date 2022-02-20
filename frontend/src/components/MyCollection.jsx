import React, { useState, useeEffect, useEffect } from 'react'
import http from 'axios';
import MyCard from './MyCard';

const MyCollection = ({ authUser, authPassword, myBackEndURL, farBackEndURL, loggedIn }) => {

  const [collection, setCollection] = useState(null);
    
  const fetchCollected = async(artwork) => {
   const response = await http.get(myBackEndURL+"/mycollection", 
    {
      headers: {
        authorization: authUser + ":::" + authPassword,
      },
    })
    const data = await response
    console.log(data);  // 401 Unauthorized ??

    setCollection(data.data)
  }

  useEffect(() => {
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
        <p>Loading...</p>
      }
      </div>
    </section>
  )
}

export default MyCollection