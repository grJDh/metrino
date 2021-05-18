import React from 'react';

const Rail = ({ mode, startStation, railPath, endStation }) => {

  const from = startStation[0] + " " + startStation[1];

  const path = railPath.reduce((toString, station) => {
    return toString + ", " + station[0] + " " + station[1];
  }, "");

  const fullPath = () => {
    switch (mode) {
      case "current":
        return from + path;
      case "done":
        const to = ", " + endStation[0] + " " + endStation[1];
        return from + path + to;
      default:
        console.log("Problem!");
    }
  } 

  return (
    <>
      {railPath.map((coords, i) => <circle cx={coords[0].toString()} cy={coords[1].toString()} r="5" fill="orange" key={i} />)}
      <polyline points={fullPath()} fill="transparent" stroke="red"/>
    </>
  );
}

export default Rail;