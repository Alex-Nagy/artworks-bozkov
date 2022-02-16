import React from 'react';
import { Link } from 'react-router-dom';
import noImage from '../img/NoImageAvailable.jpg'

const Card = ({ record }) => {

	return (
		<Link to={`details/${record.id}`}>
			<div key={record.id} className='artItem'>

				{ record.primaryimageurl ? 
					<img src={record.primaryimageurl} alt={record.title} /> : 
					<img src={noImage} alt='not available' /> 
				}
				<h3>{record.title}</h3>
				{ record.people ?
					record.people.map((artist) => <p key={artist.personid}><span className='label'>{artist.role}:</span> {artist.name}</p>) : 
					<p>Unknown artist</p> 
				} 
				<p><span className='label'>Date:</span> {record.dated === null ? 'Unknown' : record.dated}</p>

				{/* <p className='classification'><span className='label'>Classification</span>{record.classification}</p> */}
				{/* <p className='workType'><span className='label'>Work type</span>{record.worktypes.map((item, index) => item.worktype)}</p> */}
				{/* <p className='century'>Date: {record.century}</p> */}

			</div>
		</Link>
	);
};

export default Card;