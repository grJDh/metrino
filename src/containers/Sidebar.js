import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setZoom } from '../slices/map';
import { metrinoSelector, setMode } from '../slices/metrino';

import Dropdown from '../components/Dropdown';

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
  const { mode } = useSelector(metrinoSelector);

  const modeOptionsArray = [
    ["look", "look"],
    ["stations", "stations"],
    ["rails", "rails"],
  ];

  const onSetZoom = num => dispatch(setZoom(num));

  const onSetMode = event => dispatch(setMode(event.target.value));

  return (
    <Wrapper>
      <Zooms>
        <button onClick={() => onSetZoom(0.25)}>+</button>
        <button onClick={() => onSetZoom(-0.25)}>-</button>
      </Zooms>

      <Dropdown onFunc={onSetMode} value={mode} name="mode" options={modeOptionsArray} />
    </Wrapper>
  );
}

export default Sidebar;
