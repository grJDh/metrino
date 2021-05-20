import React from 'react';
import { useDispatch } from 'react-redux';

import { setZoom } from '../slices/map';
import { setMode } from '../slices/metrino';

// import Dropdown from '../components/Dropdown';

import styled from 'styled-components';

const Wrapper= styled.div`
  position: fixed;
  z-index: 10;
`;

const Zooms = styled.div`
`;

const Sidebar = () => {
  const dispatch = useDispatch();

  // const { zoom } = useSelector(mapSelector);
  // const { mode } = useSelector(metrinoSelector);

  // const modeOptionsArray = [
  //   ["look", "look"],
  //   ["stations", "stations"],
  //   ["rails", "rails"],
  // ];

  const onSetZoom = num => dispatch(setZoom(num));
  const onSetMode = mode => dispatch(setMode(mode));

  return (
    <Wrapper>
      <Zooms>
        <button onClick={() => onSetZoom(0.25)}>+</button>
        <button onClick={() => onSetZoom(-0.25)}>-</button>
      </Zooms>

      <button onClick={() => onSetMode("stations")}>Place new station</button>

      {/* <Dropdown onFunc={onSetMode} value={mode} name="mode" options={modeOptionsArray} /> */}
    </Wrapper>
  );
}

export default Sidebar;
