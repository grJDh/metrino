import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Station from '../parts/Station';
import Rail from '../parts/Rail';

import { mapSelector } from '../slices/map';
import { metrinoSelector, addStation, removeStation, addRail } from '../slices/metrino';

import styled from 'styled-components';

const Wrapper = styled.div`
  transform: scale(${props => props.zoom});
`;

const Map = ({ img }) => {
  const dispatch = useDispatch();

  const { stationsList, mode, currentRail, startStation } = useSelector(metrinoSelector);
  const { delta, zoom } = useSelector(mapSelector);

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

  const onRemoveStation = index => dispatch(removeStation(index));
 
  return (
    <Wrapper zoom={zoom}>
      <svg xmlns="http://www.w3.org/2000/svg">
        {stationsList.map((coords, i) => <Station coords={coords} key={i} index={i} onRemoveStation={onRemoveStation} />)}
        {/* {railsList.map((coords, i) => <Rail mode="done" coords={coords} key={i} index={i} />)} */}
        {(currentRail.length) && <Rail mode="current" startStation={startStation} currentRail={currentRail} />}

      </svg>
      <img src={img.src} alt="map" />
    </Wrapper>
  );
}

export default Map;
