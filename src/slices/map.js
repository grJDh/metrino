import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  // mapSrc: "https://i.imgur.com/i2UZajE.jpg",
  mapSrc: "https://gisgeography.com/wp-content/uploads/2020/07/US-Hillshade-Map-scaled.jpg",

  delta: {x: 0, y: 0},

  zoom: 1,
}

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setDelta: (state, { payload }) => {
      state.delta = payload;
    },

    setZoom: (state, { payload }) => {
      state.zoom += payload;
    },
  }
});

export const { setDelta, setZoom } = mapSlice.actions;

export const mapSelector = state => state.map;

export default mapSlice.reducer;