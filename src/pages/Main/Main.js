import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Draggable from 'react-draggable';

import { mapSelector, setDelta } from '../../slices/map';
import { addStation } from '../../slices/metrino';

import Map from '../../containers/Map/Map';

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

const Zooms = styled.div`
  position: fixed;
  z-index: 10;
`;

const Main = () => {
  const dispatch = useDispatch();

  const { mapSrc, delta } = useSelector(mapSelector);
  // const { stationsList } = useSelector(metrinoSelector);
  
  const [currentZoom, setCurrentZoom] = useState(1);

  const img = new Image();
  img.src = mapSrc;

  const placeStation = event => {
    // console.log(currentZoom, event.clientX, event.clientY)
    dispatch(addStation(
      [event.clientX - delta.x,
      event.clientY - delta.y]
      ));
  };

  const mapZoom = num => {
    // event.preventDefault();

    // currentZoom += event.deltaY * -0.01;

    setCurrentZoom(currentZoom + num);
  };

  useEffect(() => {
    window.addEventListener("click", placeStation);
    // window.addEventListener("wheel", mapZoom);
    window.addEventListener("contextmenu", () => {return false});
  
    return () => {
      window.removeEventListener("click", placeStation)
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
      <Zooms>
        <button onClick={() => mapZoom(0.25)}>+</button>
        <button onClick={() => mapZoom(-0.25)}>-</button>
      </Zooms>
      <Draggable
        allowAnyClick={true}
        axis="both"
        bounds={{top: -img.height + window.innerHeight, left: -img.width + window.innerWidth, bottom: 0, right: 0}}
        onStop={onStop}
      >
        <DragWrapper>
          <Map currentZoom={currentZoom} img={img}/>
        </DragWrapper>
      </Draggable>
      
    </Wrapper>
  );
}

export default Main;
