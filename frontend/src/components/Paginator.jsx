import React from 'react';
import './paginator.css';

const Paginator = ({onBackward, onChange, max, pageNum, onForward}) => {
    return (
      <> 
        <div className='paginator'>
          <button onClick={onBackward}>-</button>
          <button onClick={onForward}>+</button>
        </div>
        <div className="pageNumber">({pageNum} / {max})</div>
        </>
    );
};

export default Paginator;
