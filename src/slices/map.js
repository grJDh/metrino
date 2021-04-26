import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  mapSrc: "https://i.imgur.com/i2UZajE.jpg",

  delta: {x: 0, y: 0},
}

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setDelta: (state, { payload }) => {
      state.delta = payload;
    },
  }
});

export const { setDelta } = mapSlice.actions;

export const mapSelector = state => state.map;

export default mapSlice.reducer;