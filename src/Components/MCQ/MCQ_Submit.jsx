import React from 'react';

function Submit({ onClick , disabled }) {
  return(
  <div className='fire'>
  <button className='submit' onClick={onClick} disabled={disabled}>Choose</button>
  </div>);
}

export default Submit;
