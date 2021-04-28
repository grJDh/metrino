import React from 'react';

const Rail = ({ stationsList }) => {

  const lol =  stationsList.slice(1);
  // console.log(stationsList, lol)

  const path = lol.reduce((pathString, station) => {
    // console.log('1', pathString);
    // console.log('2', station);
    return pathString + " L " + station[0] + " " + station[1];
  });

  const from = "M " + stationsList[0][0] + " " + stationsList[0][1];
  // const to = " L " + stations[1][0] + " " + stations[1][1];

  // console.log(from)
  // console.log(path)

  return (
    <path d={from + path} fill="transparent" stroke="red"/>
  );
}

export default Rail;