import React from 'react';
import Draggable from 'react-draggable';

const Station = ({coords, index, onFunc}) => {

  return (
    <Draggable
      allowAnyClick={true}
      axis="none"
    >
      <circle onClick={() => onFunc(index)} cx={coords[0].toString()} cy={coords[1].toString()} r="10" fill="red" />
    </Draggable>
  );
}

export default Station;