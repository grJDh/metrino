import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  mode: "look",

  stationsList: [[500, 250]],

  railsList: [],

  startStation: [500, 500],
  currentRail: [],
}

const metrinoSlice = createSlice({
  name: 'metrino',
  initialState,
  reducers: {
    setMode: (state, { payload }) => {
      state.mode = payload;
    },

    addStation: (state, { payload }) => {
      state.stationsList = 
      [...state.stationsList, payload];
    },
    removeStation: (state, { payload }) => {
      state.stationsList = state.stationsList.filter((coords, i) => i !== payload);
    },

    addRail: (state, { payload }) => {
      state.currentRail = 
      [...state.currentRail, payload];
    },
  }
});

export const { setMode, addStation, removeStation,
               addRail } = metrinoSlice.actions;

export const metrinoSelector = state => state.metrino;

export default metrinoSlice.reducer;