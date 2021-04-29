import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Draggable from 'react-draggable';

import { mapSelector, setDelta } from '../slices/map';
// import { addStation } from '../slices/metrino';

import Map from '../containers/Map';
import Sidebar from '../containers/Sidebar'

import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;

  overflow: hidden;
  position: relative;

  img {
    pointer-events: none;
  }
`;

const DragWrapper = styled.div`
  position: absolute;

  svg { 
    background:rgba(0,0,0,0);
    position: absolute;

    height: 100%;
    width: 100%;
  }
`;

const Main = () => {
  const dispatch = useDispatch();

  const { mapSrc } = useSelector(mapSelector);
  // const { stationsList } = useSelector(metrinoSelector);

  const img = new Image();
  img.src = mapSrc;

  useEffect(() => {
    // window.addEventListener("contextmenu", () => {return false});
  
    return () => {
      window.addEventListener("contextmenu", () => {return false});
    }
  });

  const onStop = (e, ui) => {
    dispatch(setDelta({
      x: ui.lastX,
      y: ui.lastY,
    }));
  };

  // console.log(delta.x, delta.y)
 
  return (
    <Wrapper>
      <Sidebar />

      <Draggable
        allowAnyClick={true}
        axis="both"
        bounds={{top: -img.height + window.innerHeight, left: -img.width + window.innerWidth, bottom: 0, right: 0}}
        onStop={onStop}
      >
        <DragWrapper>
          <Map img={img}/>
        </DragWrapper>
      </Draggable>
      
    </Wrapper>
  );
}

export default Main;
