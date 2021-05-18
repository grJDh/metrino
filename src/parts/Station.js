import React from 'react';
import Draggable from 'react-draggable';

const Station = ({station, name, onFunc}) => {

  const coords = station.coords;

  return (
    <Draggable
      allowAnyClick={true}
      axis="none"
    >
      <circle onClick={() => onFunc(name)} cx={coords[0].toString()} cy={coords[1].toString()} r="10" fill="red" />
    </Draggable>
  );
}

export default Station;