import React from 'react';

const Rail = ({ startStation, startStationName, railPath, endStation, endStationName, onDeleteRail }) => {

  const railPathFull = (endStation) ? [startStation, ...railPath, endStation] : [startStation, ...railPath];

  const linesArray = railPathFull.reduce((acc, coords, i) => {
    if (i < railPathFull.length-1) return [...acc, [coords, railPathFull[i+1]]];
    else return acc;
  }, "");

  return (
    <>
      {linesArray.map(line => 
        <line
          x1={line[0][0]}
          y1={line[0][1]}
          x2={line[1][0]}
          y2={line[1][1]}
          stroke="red"
          key={line[0][0]+line[0][1]+line[1][0]+line[1][1]}
      />)}
    </>
    
  );
}

export default Rail;