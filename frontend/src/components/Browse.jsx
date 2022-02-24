import React, {useState, useEffect} from 'react'
import Card from './Card';
import Search from './Search';
import http from 'axios';
// import Spinner from '../img/loading.gif';

const Browse = ({ records, onChange, addToMyCollection, loggedIn, searchString, setSearchString, search, pageNumber, pages, clearSearch, itemToDisplay, setItemToDisplay, itemClose, myBackEndURL }) => {

  return (
    <>
    <div className='search'><Search searchString={searchString} setSearchString={setSearchString} search={search} clearSearch={clearSearch} /></div>
    <div className='artRecords'>
      { records.length > 0 ? 
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
          // if (savedRecords.includes(record.id))
          return <Card key={index} record={record} addToMyCollection={() => addToMyCollection(savedDetails)} loggedIn={loggedIn} itemToDisplay={itemToDisplay} setItemToDisplay={setItemToDisplay} myBackEndURL={myBackEndURL} />
        })
        : ""
        // <img src={Spinner} alt="Loading..." className='spinner'/>
      }
    </div>
    { pageNumber < pages && <button className='loader' onClick={onChange}>load more...</button> }
		{/* {itemToDisplay !== false &&
			<div className="imageItem" onClick={itemClose}>
				<img src={itemToDisplay} alt="viewer"/>;
			</div>
		} */}
    </>
  )
}

export default Browse