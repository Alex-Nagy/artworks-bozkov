import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import noImage from '../img/NoImageAvailable.jpg'
import { HiOutlineSaveAs } from "react-icons/hi";
import { CgDetailsMore } from "react-icons/cg";

const MyCard = ({ record, loggedIn, farBackEndURL }) => {
    const [ itemToDisplay, setItemToDisplay ] = useState(false);
	// const [ tagTitle, setTagTitle ] = useState("");

    const showPicture = (e) => {
		setItemToDisplay(e);
	  }
	  const itemClose = () => {
		setItemToDisplay(false);
	  }
	console.log(farBackEndURL + '/files/download/' + record.uuid);
	return (
		<>
		<div key={record.id} className='artItem'>

			<div>
				{/* <Link to={`/details/${record.id}`}> */}
				{ record.primaryimageurl ? 
					<img src={farBackEndURL + '/files/download/' + record.uuid} alt={record.title} onClick={() => showPicture(farBackEndURL + '/files/download/' + record.uuid)} /> : 
					<img src={noImage} alt='not available' /> 
				}
				{/* </Link> */}
				<h3>{record.title}</h3>
			</div>

			<div>
				{ record.people ?
					record.people.map((artist, index) => <p key={index}><span className='label'>{artist.role}:</span> {artist.name}</p>) : 
					<p>Unknown artist</p> 
				} 
				<p><span className='label'>Date:</span> {record.dated === null ? 'Unknown' : record.dated}</p>
			</div>
			<div>
				{/* <p><span className="label">Tag(s):</span></p> */}
				{ record.tags ?
					record.tags.map((tag, index) => <span key={index}>{tag.title}</span>) : 
					<p></p> 
				}
			</div>
			<div className="actions">
				<Link to={`/details/${record.id}`}><button title="details"><CgDetailsMore /></button></Link>
				{/* <div className="addTagDiv">
					<input type="text" className="addTagTitle" value={tagTitle} placeholder="add new tag" onChange={(e) => setTagTitle(e.target.value)} />
				</div>
				<button className="addTagButton">+</button> */}
			</div>
		</div>
		{itemToDisplay !== false &&
			<div className="imageItem" onClick={itemClose}>
				<img src={record.primaryimageurl} alt={record.title}/>;
			</div>
			// <Picture onClick={itemClose} item={pixArray[itemToDisplay]} />
		}
		</>  			
	);
};

export default MyCard;