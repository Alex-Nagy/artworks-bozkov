import React from 'react'
import Card from './Card';
import Search from './Search';

const Browse = ({ records, onChange, addToMyCollection, loggedIn, searchString, setSearchString, search, pageNumber, pages }) => {

  return (
    <>
    <div className='search'><Search searchString={searchString} setSearchString={setSearchString} search={search} /></div>
    <div className='artRecords'>
      { records.length ? 
        records.map((record, index) => {
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
          return <Card key={index} record={record} addToMyCollection={() => addToMyCollection(savedDetails)} loggedIn={loggedIn} />
        })
        : 
        <p className='loading'>Loading...</p>
      }
    </div>
    { pageNumber < pages && <button className='loader' onClick={onChange}>load more...</button> }
    </>
  )
}

export default Browse