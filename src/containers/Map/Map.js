import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Station from '../../parts/Station';
// import Rail from '../../parts/Rail';

// import { mapSelector } from '../../slices/map';
import { metrinoSelector, removeStation } from '../../slices/metrino';

import styled from 'styled-components';

const Wrapper = styled.div`
  transform: scale(${props => props.currentZoom});
`;

const Map = ({currentZoom, img}) => {
  const dispatch = useDispatch();

  const { stationsList } = useSelector(metrinoSelector);

  const onRemoveStation = index => dispatch(removeStation(index));
 
  return (
    <Wrapper currentZoom={currentZoom}>
      <svg xmlns="http://www.w3.org/2000/svg">
        {stationsList.map((coords, i) => <Station coords={coords} key={i} index={i} onRemoveStation={onRemoveStation} />)}
        {/* {(stationsList.length > 1) && <Rail stationsList={stationsList} />} */}
      </svg>
      <img src={img.src} alt="map" />
    </Wrapper>
  );
}

export default Map;
