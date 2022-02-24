import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getDetails } from '../api';
import noImage from '../img/NoImageAvailable.jpg'
import { HiOutlineSaveAs } from "react-icons/hi";
import Spinner from '../img/loading.gif';
import http from "axios";


const Details = ({addToMyCollection, loggedIn, setItemToDisplay, myBackEndURL}) => {

  const { id } = useParams();

  const [ details, setDetails ] = useState(null);
  const [ savedDetails, setSavedDetails ] = useState(null);

  const [ duplicated, setDuplicated ] = useState(false);

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
      // try {
      //   const response = await http.get(myBackEndURL+"/mycollection", 
      //   {
      //     headers: {
      //       authorization: localStorage.getItem('sessionId'),
      //     },
      //   })
      //   const data = await response    
      //   if (data.data && data.data.length > 0) {
      //     // console.log(data.data)
      //     for (const item of data.data) {
      //       if (item.id === id) setDuplicated(true);
      //       console.log("item: " + item.id + ",  keresett: " + id )
      //     }
      //   }
      // } catch (err) {
      // }
    };
    init();
  }, []);
  
  useEffect(() => {
    const check = async () => {
      try {
        const response = await http.get(myBackEndURL+"/mycollection", 
        {
          headers: {
            authorization: localStorage.getItem('sessionId'),
          },
        })
        const data = await response    
        if (data.data && data.data.length > 0) {
          // console.log(data.data)
          for (const item of data.data) {
            if (item.id === parseInt(id)) setDuplicated(true);
            // console.log("item: " + item.id + ",  keresett: " + id )
          }
        }
      } catch (err) {
      }
    };
    check();
  }, []);

  return (
    <div className='details'>

      { details ? 
        <div>

          <div className='detailsDiv'>
            { details.primaryimageurl ? 
              <img src={details.primaryimageurl} alt={details.title} className='imageInDetails' onClick={() => setItemToDisplay(details.primaryimageurl)} /> : 
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
              <p><span>Date:</span> {details.dated === null ? 'Unknown' : details.dated} </p>
              <p><span>Culture:</span> {details.culture === null ? 'Unknown' : details.culture}</p>
              <p><span>Classification:</span> {details.classification === null ? 'Unknown' : details.classification}</p>
              {/* <p><span>Worktype:</span> {details.worktype === null ? 'Unknown' : details.worktype} </p> */}
              <p><span>Technique:</span> {details.technique === null ? 'Unknown' : details.technique}</p>
              <p><span>Dimensions:</span> {details.dimensions === null ? 'Cannot be determined' : details.dimensions}</p>
            </div>
          </div>
          
          <div className="detailsButtons">
            {loggedIn && !duplicated && <button title="Add to my collection" onClick={() => addToMyCollection(savedDetails)}><HiOutlineSaveAs /><span className="buttonTitleLeft">Save</span></button>}
            <button onClick={() => window.history.back()}>Back To The Collection</button>
          </div>
        </div> :
          <img src={Spinner} alt="Loading..." className='spinner'/>

      }

    </div>
  );
};
  
export default Details;