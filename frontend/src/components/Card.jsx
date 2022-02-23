import React from 'react';
import { Link } from 'react-router-dom';
import noImage from '../img/NoImageAvailable.jpg'
import { HiOutlineSaveAs } from "react-icons/hi";
import { CgDetailsMore } from "react-icons/cg";

const Card = ({ record, addToMyCollection, loggedIn, itemToDisplay, setItemToDisplay }) => {

    // const showPicture = (e) => {
		// setItemToDisplay(e);
	  // }
	  // const itemClose = () => {
		// setItemToDisplay(false);
	  // }
  
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
				<h3>{record.title.split(',')[0] || record.title.split(';')[0] }</h3>
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
				<Link to={`/details/${record.id}`}><button title="details"><CgDetailsMore /></button></Link>
				{loggedIn && <button title="Add to my collection" onClick={addToMyCollection}><HiOutlineSaveAs /></button>}
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