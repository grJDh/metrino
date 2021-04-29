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

const StationInfo = ({ index, coords }) => {

  return (
    <Wrapper left={coords[0]} top={coords[1]} >
      {index}
      <button >Start new rails from here</button>
    </Wrapper>
  );
}

export default StationInfo;