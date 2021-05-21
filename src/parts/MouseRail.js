import React from 'react';

const MouseRail = ({ lastPoint, mousePoint }) => {

  const path = lastPoint[0] + " " + lastPoint[1]  + " " + (mousePoint[0] - 1) + " " + (mousePoint[1] - 1);
  // использовать здесь минусы не идеально. подумать над другим решением

  return (
    <>
      <polyline points={path} fill="transparent" stroke="red" />
    </>
  );
}

export default MouseRail;