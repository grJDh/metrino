import React from 'react';

const Rail = ({ startStation, currentRail }) => {

  // const lol = currentRail.slice(1);
  // console.log(lol)

  const to = currentRail.reduce((toString, station) => {
    // console.log('toString', toString);
    // console.log('station', station);
    return toString + " L " + station[0] + " " + station[1];
  }, "");

  const from = "M " + startStation[0] + " " + startStation[1];
  // const to = " L " + currentRail[0][0] + " " + currentRail[0][1];

  // console.log(from)
  // console.log(to)

  return (
    <>
      {currentRail.map((coords, i) => <circle cx={coords[0].toString()} cy={coords[1].toString()} r="5" fill="orange" key={i} />)}
      <path d={from + to} fill="transparent" stroke="red"/>
    </>
  );
}

export default Rail;