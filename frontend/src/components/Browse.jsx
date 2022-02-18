import React from 'react'
import Card from './Card';

const Browse = ({ records, onChange, addToMyCollection, loggedIn }) => {

  return (
    <>
    <div className='artRecords'>
      { records.length ? 
        records.map((record, index) => <Card key={index} record={record} addToMyCollection={() => addToMyCollection(record)} loggedIn={loggedIn} />) : 
        <p className='loading'>Loading...</p>
      }
    </div>
    <button className='loader' onClick={onChange}>+</button>
    </>
  )
}

export default Browse