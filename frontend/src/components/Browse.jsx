import React from 'react'
import Card from './Card';

const Browse = ({ records, onChange, addToMyCollection, loggedIn }) => {

  return (
    <>
    <div className='artRecords'>
      { records.length ? 
        records.map((record) => {
          let savedDetails = {
            id: record.id,
            title: record.title,
            primaryimageurl: record.primaryimageurl,
            people: record.people, 
            dated: record.dated, 
            culture: record.culture, 
            classification: record.classification, 
            technique: record.technique,
            dimensions: record.dimensions
          }
          return <Card key={record.id} record={record} addToMyCollection={() => addToMyCollection(savedDetails)} loggedIn={loggedIn} />
        })
        : 
        <p className='loading'>Loading...</p>
      }
    </div>
    <button className='loader' onClick={onChange}>+</button>
    </>
  )
}

export default Browse