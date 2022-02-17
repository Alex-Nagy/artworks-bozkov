import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getDetails } from '../api';
import noImage from '../img/NoImageAvailable.jpg'

const Details = ({addToMyCollection}) => {

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
    <div className='details'>

      <h1>Object details</h1>

      { details ? 
        <div>
          { details.primaryimageurl ? 
            <img src={details.primaryimageurl} alt={details.title} className='imageInDetails' /> : 
            <img src={noImage} alt='not available' className='noImageInDetails' /> 
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
      <button title="Add to my collection" onClick={() => addToMyCollection(details)}>+</button>
      <Link to="/browse"><button>Back to the collection</button></Link>

    </div>
  );
};
  
export default Details;