import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getDetails } from '../api';
import noImage from '../img/NoImageAvailable.jpg'
import { HiOutlineSaveAs } from "react-icons/hi";
import Spinner from '../img/Spinner.gif';


const Details = ({addToMyCollection, loggedIn}) => {

  const { id } = useParams();
  // console.log(id);

  const [ details, setDetails ] = useState(null);
  const [ savedDetails, setSavedDetails ] = useState(null);

  useEffect(() => {
    const init = async () => {
      const detailsData = await getDetails(id);
      //console.log(detailsData);
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

      { details ? 
        <div>

          <div className='detailsDiv'>
            { details.primaryimageurl ? 
              <img src={details.primaryimageurl} alt={details.title} className='imageInDetails' /> : 
              <img src={noImage} alt='not available' className='noImageInDetails' /> 
            }
            <div className='objectDetails'>
              <h1>{details.title.split(',')[0]}</h1>
              <p><span>Title:</span> {details.title}</p>
              { details.people ?
                details.people.map((artist) => <p key={artist.personid}><span>{artist.role}:</span> {artist.name}</p>) : 
                <p><span>Artist:</span> Unknown artist</p> 
              } 
              <p><span>Description:</span> {details.description === null ? 'Unknown' : details.description} </p>
              <p><span>Classification:</span> {details.classification === null ? 'Unknown' : details.classification} </p>
              <p><span>Worktype:</span> {details.worktype === null ? 'Unknown' : details.worktype} </p>
              <p><span>Date:</span> {details.dated === null ? 'Unknown' : details.dated} </p>
              <p><span>Culture:</span> {details.culture === null ? 'Unknown' : details.culture}</p>
              <p><span>Classification:</span> {details.classification === null ? 'Unknown' : details.classification}</p>
              <p><span>Technique:</span> {details.technique === null ? 'Unknown' : details.technique}</p>
              <p><span>Dimensions:</span> {details.dimensions === null ? 'Cannot be determined' : details.dimensions}</p>
            </div>
          </div>

          {loggedIn && <button title="Add to my collection" onClick={() => addToMyCollection(savedDetails)}><HiOutlineSaveAs /></button>}
          {/* <Link to="/browse"><button>Back to the collection</button></Link> */}
          <button onClick={() => window.history.back()}>Back To The Collection</button>

        </div> :
          <img src={Spinner} alt="Loading..." className='spinner'/>

      }

    </div>
  );
};
  
export default Details;