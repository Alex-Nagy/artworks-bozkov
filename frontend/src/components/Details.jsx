import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getDetails } from '../api';
import noImage from '../img/NoImageAvailable.jpg'

const Details = () => {

  const { id } = useParams();
  // console.log(id);

  const [ details, setDetails ] = useState(null);

  useEffect(() => {
    const init = async () => {
      const detailsData = await getDetails(id);
      console.log(detailsData);
      setDetails(detailsData);
    };
    init();
  }, []);
  
  return (
    <div>

      <h1>Object details</h1>

      { details ? 
        <div>
          { details.primaryimageurl ? 
            <img src={details.primaryimageurl} alt={details.title} className='imageInDetails' /> : 
            <img src={noImage} alt='not available' className='noImageInDetails' /> 
				  }
          <p>Title: {details.title}</p>
          { details.people ?
            details.people.map((artist) => <p key={artist.personid}><span className='label'>{artist.role}:</span> {artist.name}</p>) : 
            <p>Unknown artist</p> 
          } 
          <p>Date: {details.dated}</p>
          <p>Culture: {details.culture}</p>
          <p>Classification: {details.classification}</p>
          <p>Technique: {details.technique}</p>
          <p>Dimensions: {details.dimensions}</p>
        </div> :
        <p>Loading...</p>
      }

      <Link to="/"><button>Back to lists</button></Link>

    </div>
  );
};
  
export default Details;