import React from 'react'
import Card from './Card';

const Browse = (props) => {
  return (
    <>
    <div className='artRecords'>
      { props.records.length ? 
        props.records.map((record, index) => <Card key={index} record={record} />) : 
        <p className='loading'>Loading...</p>
      }
    </div>
    <button className='loader' onClick={props.onChange}>+</button>
    </>
  )
}

export default Browse