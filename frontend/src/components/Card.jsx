import React from 'react'

const Card = (props) => {
    const { record } = props;
    return (
    <div key={record.id} className="artItem" >
        {record.primaryimageurl ? 
            <img alt={record.id} src={record.primaryimageurl} /> : 
            <p>No image</p>
        }
        <h3>{record.title}</h3>
        <p className="classification"><span className='label'>Classification</span>{record.classification}</p>
        <p className="workType"><span className='label'>Work type</span>{record.worktypes.map((item, index) => item.worktype)}</p>
        <p className="century">{record.century}</p>
    </div>
    )
}

export default Card