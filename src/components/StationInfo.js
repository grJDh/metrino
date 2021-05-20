import React from 'react';

import styled from 'styled-components';

const Wrapper= styled.div`
  position: absolute;
  width: 100px;
  height: 100px;

  background-color: white;

  z-index: 100;

  left: ${props => props.left}px;
  top: ${props => props.top}px;
`;

const StationInfo = ({ name, coords, mode, onSetStartStation, onEndCurrenRail, startStation, onDeleteStation }) => {

  return (
    <Wrapper left={coords[0]} top={coords[1]} >
      {name}
      {(mode === "look") && <button onClick={() => onSetStartStation(name)}>Start new rails</button>}
      {(mode === "rails" && name !== startStation) && <button onClick={() => onEndCurrenRail(name)}>End rails</button>}
      {(mode === "look") && <button onClick={() => onDeleteStation(name)}>Delete station</button>}
    </Wrapper>
  );
}

export default StationInfo;