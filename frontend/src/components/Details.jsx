import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getDetails } from '../api';
import noImage from '../img/NoImageAvailable.jpg'
import { HiOutlineSaveAs } from "react-icons/hi";

const Details = ({addToMyCollection, loggedIn}) => {

  const { id } = useParams();
  // console.log(id);

  const [ details, setDetails ] = useState(null);
  const [ savedDetails, setSavedDetails ] = useState(null);

  useEffect(() => {
    const init = async () => {
      const detailsData = await getDetails(id);
      console.log(detailsData);
      setDetails(detailsData);
      setSavedDetails({
        id: detailsData.id,
        title: detailsData.title,
        primaryimageurl: detailsData.primaryimageurl,
        people: detailsData.people, 
        dated: detailsData.dated, 
        culture: detailsData.culture, 
        classification: detailsData.classification, 
        technique: detailsData.technique,
        dimensions: detailsData.dimensions
      })
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
          </div>
          {loggedIn && <button title="Add to my collection" onClick={() => addToMyCollection(savedDetails)}><HiOutlineSaveAs /></button>}
          {/* <Link to="/browse"><button>Back to the collection</button></Link> */}
          <button onClick={() => window.history.back()}>Back to the collection</button>
        </div> :
        <p>Loading...</p>
      }

    </div>
  );
};
  
export default Details;