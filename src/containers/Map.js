import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Station from '../parts/Station';
import Rail from '../parts/Rail';
import MouseRail from '../parts/MouseRail';
import StationInfo from '../components/StationInfo';

import { mapSelector } from '../slices/map';
import { metrinoSelector,
         setMode,
         addStation, deleteStation,
         setStartStation, addRail, deleteLastRail, endCurrenRail, clearRail } from '../slices/metrino';

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
  const [mouseCoords, setMouseCoords] = useState([0, 0]);

  const onStationClick = name => {
    setStationInfoName(name);
  }
  
  const onMapClick = event => {

    // console.log(event)

    if (event.target.tagName === "svg" || event.target.tagName === "path") {
      setStationInfoName("");

      if (mode === "rails") {
        dispatch(addRail(
          [event.clientX - delta.x,
          event.clientY - delta.y]
        ));
      }

      // if (mode === "look") {
        
      // }

      if (mode === "stations") {
        const name = prompt("Enter station name");
        
        if (name !== null) {
          dispatch(addStation([
            name,
            [event.clientX - delta.x,
            event.clientY - delta.y]
          ]));
        }

        dispatch(setMode("look"));
      }
    }
  }

  const onMapContextMenu = event => {
    event.preventDefault();

    if (mode === "rails") {
      dispatch(deleteLastRail());
    }
  }

  const onMouseMove = event => {
    if (mode === "rails") {
      setMouseCoords(
        [event.clientX - delta.x,
        event.clientY - delta.y]);
    }
  }

  const onSetStartStation = name => {
    dispatch(setStartStation(name));
    dispatch(setMode("rails"));
    setStationInfoName("");
  }

  const onEndCurrenRail = name => {
    dispatch(endCurrenRail(name));
    dispatch(setMode("look"));
    dispatch(setStartStation(""));
    dispatch(clearRail());
    setStationInfoName("");
  }

  const onDeleteStation = name => {
    if (window.confirm("Are you sure you want to delete this station? This action cannot be undone!")) {
      setStationInfoName("");
      dispatch(deleteStation(name));
    }
  }

  const onDeleteRail = obj => {
    console.log(obj)
  }
 
  return (
    <Wrapper zoom={zoom}>
      {(stationInfoName) ?
        <StationInfo
          name={stationInfoName}
          coords={stationsList[stationInfoName].coords}
          mode={mode}
          onSetStartStation={onSetStartStation}
          onEndCurrenRail={onEndCurrenRail}
          startStation={startStation}
          onDeleteStation={onDeleteStation}
        /> : ""}

      <svg xmlns="http://www.w3.org/2000/svg" onClick={onMapClick} onContextMenu={onMapContextMenu} onMouseMove={(event) => onMouseMove(event)} >
        {Object.keys(stationsList).map(stationName =>
        <Station key={stationName} station={stationsList[stationName]} name={stationName} onFunc={onStationClick} />)}
        
        {railsList.map(railPath =>
        <Rail
          key={railPath.from+railPath.path+railPath.to}
          startStation={stationsList[railPath.from].coords}
          startStationName={railPath.from}
          railPath={railPath.path}
          endStation={stationsList[railPath.to].coords}
          endStationName={railPath.to}
          onDeleteRail={onDeleteRail}
        />)}

        {(startStation) ?
        <MouseRail
          lastPoint={(currentRail.length) ? currentRail[currentRail.length-1] : stationsList[startStation].coords}
          mousePoint={mouseCoords}
        /> : ""}
        
        {(currentRail.length) ?
        <Rail
          startStation={stationsList[startStation].coords}
          railPath={currentRail}
        /> : ""}

      </svg>

      <img src={img.src} alt="map"/>
    </Wrapper>
  );
}

export default Map;
