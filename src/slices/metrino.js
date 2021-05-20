import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  mode: "look",

  stationsList: {
  "idaho": {
    coords: [500, 250]
  },
  "california": {
    coords: [250, 500]
  }
  },

  railsList: [
    {
      from: "idaho",
      to: "california",
      path: [],
      dist: 353.55,
    }
  ],

  startStation: "",
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
      {...state.stationsList,
      [payload[0]]: {
        coords: payload[1]
      }}
    },
    removeStation: (state, { payload }) => {
      state.stationsList = state.stationsList.filter((coords, i) => i !== payload);
    },

    setStartStation: (state, { payload }) => {
      state.startStation = payload;
    },
    addRail: (state, { payload }) => {
      state.currentRail = 
      [...state.currentRail, payload];
    },
    endCurrenRail: (state, { payload }) => {
      state.railsList = [...state.railsList,
      {
        from: state.startStation,
        to: payload[0],
        path: state.currentRail,
        dist: payload[1]
      }
      ];

      state.startStation = "";
      state.currentRail = [];
    },
  }
});

export const { setMode, addStation, removeStation,
               setStartStation, addRail, endCurrenRail } = metrinoSlice.actions;

export const metrinoSelector = state => state.metrino;

export default metrinoSlice.reducer;