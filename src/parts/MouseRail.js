import React from 'react';

const MouseRail = ({ lastPoint, mousePoint }) => {

  const path = lastPoint[0] + " " + lastPoint[1]  + " " + (mousePoint[0] - 1) + " " + (mousePoint[1] - 1);

  return (
    <>
      {/* <circle cx={mousePoint[0].toString()} cy={mousePoint[1].toString()} r="5" fill="orange" /> */}
      <polyline points={path} fill="transparent" stroke="red" />
    </>
  );
}

export default MouseRail;