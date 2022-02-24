import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import noImage from '../img/NoImageAvailable.jpg'
import { HiOutlineSaveAs } from "react-icons/hi";
import { CgDetailsMore } from "react-icons/cg";
import http from "axios";

const Card = ({ record, addToMyCollection, loggedIn, itemToDisplay, setItemToDisplay, myBackEndURL }) => {

	const [ duplicated, setDuplicated ] = useState(false);

	// const [ savedRecords, setSavedRecords ] = useState([]);

	// useEffect(() => {
	//   const check = async () => {
	// 	try {
	// 	  const response = await http.get(myBackEndURL+"/mycollection", 
	// 	  {
	// 		headers: {
	// 		  authorization: localStorage.getItem('sessionId'),
	// 		},
	// 	  })
	// 	  const data = await response 
	// 	  let records = [];   
	// 	  if (data.data && data.data.length > 0) {
	// 		for (const item of data.data) {
	// 		  // console.log("item: " + item.id)
	// 		  records.push(item.id);
	// 		}
	// 	  }
	// 	  setSavedRecords(records);
	// 	} catch (err) {
	// 	}
	//   };
	//   check();
	// }, []);

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
				if (item.id === parseInt(record.id)) setDuplicated(true);
				// console.log("item: " + item.id + ",  keresett: " + record.id )
			  }
			}
		  } catch (err) {
		  }
		};
		check();
	  }, []);
		  
	// console.log(savedRecords);
  
	return (
		<>
		<div key={record.id} className='artItem'>

			<div>
				{/* <Link to={`/details/${record.id}`}> */}
				{ record.primaryimageurl ? 
					<img src={record.primaryimageurl} alt={record.title} onClick={() => setItemToDisplay(record.primaryimageurl)} /> : 
					<img src={noImage} alt='not available' /> 
				}
				{/* </Link> */}
				{(record.title.charAt(0) === "[") ? <h3>{record.title}</h3> :
				<h3>{record.title.split(',')[0] || record.title.split(';')[0] }</h3>}
			</div>

			<div>
				{ record.people ?
					// record.people.map((artist, index) => <p key={index}><span className='label'>{artist.role}:</span> {artist.name}</p>) : 
					record.people.map((artist, index) => <p key={index}> {artist.name}</p>) : 
					<p>Unknown artist</p> 
				} 
				{/* <p><span className='label'>Date:</span> {record.dated === null ? 'Unknown' : record.dated}</p> */}
			</div>
			<div className="actions">
				<Link to={`/details/${record.id}`}><button title="Details"><CgDetailsMore /><span className="buttonTitleLeft">Details</span></button></Link>
				
				{loggedIn && !duplicated && <><button title="Add to my collection" onClick={addToMyCollection}><span className="buttonTitleRight">Save</span><HiOutlineSaveAs /></button></>}
			</div>

		</div>
		{/* {itemToDisplay !== false &&
			<div className="imageItem" onClick={itemClose}>
				<img src={record.primaryimageurl} alt={record.title}/>;
			</div>
		} */}
		</>  			
	);
};

export default Card;