import React from 'react';
import { useSelector } from 'react-redux';

import Station from '../../parts/Station';

// import { mapSelector } from '../../slices/map';
import { metrinoSelector } from '../../slices/metrino';

import styled from 'styled-components';

const Wrapper = styled.div`
  transform: scale(${props => props.currentZoom});
`;

const Map = ({currentZoom, img}) => {
  // const dispatch = useDispatch();

  const { stationsList } = useSelector(metrinoSelector);
 
  return (
    <Wrapper currentZoom={currentZoom}>
      <svg xmlns="http://www.w3.org/2000/svg">
        {stationsList.map((coords, i) => <Station coords={coords} key={i}/>)}
      </svg>
      <img src={img.src} alt="map" />
    </Wrapper>
  );
}

export default Map;
