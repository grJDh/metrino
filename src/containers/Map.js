import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Station from '../parts/Station';
import Rail from '../parts/Rail';
import StationInfo from '../components/StationInfo';

import { mapSelector } from '../slices/map';
import { setMode, metrinoSelector, addStation, setStartStation, addRail, endCurrenRail } from '../slices/metrino';

import styled from 'styled-components';

const Wrapper = styled.div`
  transform: scale(${props => props.zoom});
  position: relative;
`;

const Map = ({ img }) => {
  const dispatch = useDispatch();

  const { stationsList, mode, currentRail, startStation, railsList } = useSelector(metrinoSelector);
  const { delta, zoom } = useSelector(mapSelector);

  const [stationInfoName, setStationInfoName] = useState("");

  const onStationClick = name => {
    setStationInfoName(name);
  }
  
  const onMapClick = event => {

    if (event.target.tagName === "svg" || event.target.tagName === "polyline") {
      if (mode === "rails") {
        dispatch(addRail(
          [event.clientX - delta.x,
          event.clientY - delta.y]
        ));
      }
    }
    
    if (event.target.tagName === "svg") {
      if (mode === "look") {
        setStationInfoName("");
      }

      if (mode === "stations") {
        const name = prompt("Enter station name");

        dispatch(addStation([
          name,
          [event.clientX - delta.x,
          event.clientY - delta.y]
        ]));

        dispatch(setMode("look"));
      }
    }
  }

  const onSetStartStation = name => {
    dispatch(setStartStation(name));
    dispatch(setMode("rails"));
    setStationInfoName("");
  }

  const onEndCurrenRail = name => {

    const path = [stationsList[startStation].coords, ...currentRail, stationsList[name].coords]

    console.log(path)

    const dist = path.reduce((accum, stationA, i) => {
      console.log(accum, stationA, path[i+1], i)
      if (i < path.length - 1) {
        const stationB = path[i+1];
        const currentDist = Math.floor(Math.sqrt((Math.pow(stationB[0] - stationA[0],2) + Math.pow(stationB[1] - stationA[1],2))) * 100) / 100;

        return accum + currentDist;
      } else return accum;
    }, 0);

    dispatch(endCurrenRail([name, dist]));
    dispatch(setMode("look"));
    setStationInfoName("");
  }
 
  return (
    <Wrapper zoom={zoom}>
      {(stationInfoName) ?
        <StationInfo
          name={stationInfoName}
          coords={stationsList[stationInfoName].coords}
          onSetStartStation={onSetStartStation}
          onEndCurrenRail={onEndCurrenRail}
          mode={mode}
          startStation={startStation}
        /> : ""}

      <svg xmlns="http://www.w3.org/2000/svg" onClick={onMapClick} >
        {Object.keys(stationsList).map(stationName =>
        <Station key={stationName} station={stationsList[stationName]} name={stationName} onFunc={onStationClick} />)}
        
        {railsList.map(railPath =>
        <Rail
          key={railPath.from+railPath.path+railPath.to}
          mode="done"
          startStation={stationsList[railPath.from].coords}
          railPath={railPath.path}
          endStation={stationsList[railPath.to].coords}
        />)}
        
        {(currentRail.length) ? <Rail mode="current" startStation={stationsList[startStation].coords} railPath={currentRail} /> : ""}
      </svg>

      <img src={img.src} alt="map"/>
    </Wrapper>
  );
}

export default Map;
