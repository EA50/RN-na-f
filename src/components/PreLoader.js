import React from 'react';
import PropagateLoader from "react-spinners/PropagateLoader";

const PreLoader = () => {


  return (
    <PropagateLoader
        color="#655aff"
        cssOverride={{ 'position': 'absolute'}}
        speedMultiplier={1.5}
        className='pre-loader'
    />
  )
}

export default PreLoader