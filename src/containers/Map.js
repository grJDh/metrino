import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Station from '../parts/Station';
import Rail from '../parts/Rail';
import StationInfo from '../components/StationInfo';

import { mapSelector } from '../slices/map';
import { metrinoSelector, addStation, addRail } from '../slices/metrino';

import styled from 'styled-components';

const Wrapper = styled.div`
  transform: scale(${props => props.zoom});
  position: relative;
`;

const Map = ({ img }) => {
  const dispatch = useDispatch();

  const { stationsList, mode, currentRail, startStation } = useSelector(metrinoSelector);
  const { delta, zoom } = useSelector(mapSelector);

  const [stationInfoIndex, setStationInfoIndex] = useState(-1);

  const handleClick = event => {
    if (mode === "stations") {
      dispatch(addStation(
        [event.clientX - delta.x,
        event.clientY - delta.y]
      ));
    }

    if (mode === "rails") {
      dispatch(addRail(
        [event.clientX - delta.x,
        event.clientY - delta.y]
      ));
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);
    // window.addEventListener("wheel", mapZoom);
  
    return () => {
      window.removeEventListener("click", handleClick);
      // window.addEventListener("wheel", zoom);
    }
  });

  const onStationClick = index => setStationInfoIndex(index);
  const onMapClick = event => (event.target.tagName === "svg") && setStationInfoIndex(-1);
 
  return (
    <Wrapper zoom={zoom}>
      {(stationInfoIndex >= 0) ? <StationInfo index={stationInfoIndex} coords={stationsList[stationInfoIndex]} /> : ""}

      <svg xmlns="http://www.w3.org/2000/svg" onClick={onMapClick} >
        {stationsList.map((coords, i) => <Station coords={coords} key={i} index={i} onFunc={onStationClick} />)}
        {/* {railsList.map((coords, i) => <Rail mode="done" coords={coords} key={i} index={i} />)} */}
        {(currentRail.length) ? <Rail mode="current" startStation={startStation} currentRail={currentRail} /> : ""}
      </svg>

      <img src={img.src} alt="map"/>
    </Wrapper>
  );
}

export default Map;
