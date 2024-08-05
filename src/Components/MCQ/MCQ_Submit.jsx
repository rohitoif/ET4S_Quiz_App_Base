import React from 'react';

function Submit({ onClick , disabled }) {
  return(
  <div className='fire'>
  <button className='submit' onClick={onClick} disabled={disabled}>FIRE</button>
  </div>);
}

export default Submit;
