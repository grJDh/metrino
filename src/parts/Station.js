import React from 'react';

const Station = ({coords}) => {

  // console.log(coords[0].toString(), coords[1].toString())

  return (
    <circle cx={coords[0].toString()} cy={coords[1].toString()} r="10" fill="red"/>
  );
}

export default Station;