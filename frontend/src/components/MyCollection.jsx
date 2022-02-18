import React, { useState } from 'react'
import http from 'axios';

const MyCollection = ({authUser, authPassword }) => {

  const [details, setDetails] = useState(null);
    
  const fetchCollected = async(artwork) => {
   const response = await http.get("http://localhost:4000/api/mycollection", {
      artwork: artwork,
    },
    {
      headers: {
        authorization: authUser + ":::" + authPassword,
      },
    })
    const data = await response
    console.log(data);  // 401 Unauthorized ??

    setDetails(data)
  }
  fetchCollected()
  
  return (
    <div>
      <h1>My Collection</h1>
      { details ? 
        <div>
          { details.primaryimageurl ? 
            <img src={details.primaryimageurl} alt={details.title} className='imageInDetails' /> : 
            <img alt='not available' className='noImageInDetails' /> 
				  }
          <div className='objectDetails'>
            <p><span>Title:</span> {details.title}</p>
            { details.people ?
              details.people.map((artist) => <p key={artist.personid}><span>{artist.role}:</span> {artist.name}</p>) : 
              <p>Unknown artist</p> 
            } 
            <p><span>Date:</span> {details.dated === null ? 'Unknown' : details.dated} </p>
            <p><span>Culture:</span> {details.culture}</p>
            <p><span>Classification:</span> {details.classification}</p>
            <p><span>Technique:</span> {details.technique === null ? 'Unknown' : details.technique}</p>
            <p><span>Dimensions:</span> {details.dimensions === null ? 'Cannot be determined' : details.dimensions}</p>
          </div> :
        </div> :
        <p>Loading...</p>
      }
    </div>
  )
}

export default MyCollection