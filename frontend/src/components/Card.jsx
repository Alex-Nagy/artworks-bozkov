import React from 'react';
import { Link } from 'react-router-dom';
import noImage from '../img/NoImageAvailable.jpg'

const Card = ({ record, addToMyCollection }) => {

	return (
		<div key={record.id} className='artItem'>

			<div>
				<Link to={`/details/${record.id}`}>
				{ record.primaryimageurl ? 
					<img src={record.primaryimageurl} alt={record.title} /> : 
					<img src={noImage} alt='not available' /> 
				}
				</Link>
				<h3>{record.title}</h3>
			</div>

			<div>
				{ record.people ?
					record.people.map((artist) => <p key={artist.personid}><span className='label'>{artist.role}:</span> {artist.name}</p>) : 
					<p>Unknown artist</p> 
				} 
				<p><span className='label'>Date:</span> {record.dated === null ? 'Unknown' : record.dated}</p>
			</div>

			<button title="Add to my collection" onClick={addToMyCollection}>+</button>
		</div>
	);
};

export default Card;