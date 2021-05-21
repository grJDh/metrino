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
    deleteStation: (state, { payload }) => {
      //removing station from stationsList
      const { [payload]:omit, ...updatedStationsList } = state.stationsList;
      state.stationsList = updatedStationsList;

      //removing all rails connected to station from railsList
      state.railsList = state.railsList.filter((rail, i) => {
        if (rail.from === payload || rail.to === payload) return false
        else return true
      });
    },

    setStartStation: (state, { payload }) => {
      state.startStation = payload;
    },
    addRail: (state, { payload }) => {
      state.currentRail = 
      [...state.currentRail, payload];
    },
    deleteLastRail: state => {
      state.currentRail = state.currentRail.slice(0,-1);
    },
    endCurrenRail: (state, { payload }) => {
      //calculating distance between stations 
      const path = [state.stationsList[state.startStation].coords, ...state.currentRail, state.stationsList[payload].coords];

      const distance = path.reduce((accum, stationA, i) => {
        if (i < path.length - 1) {
          const stationB = path[i+1];
          const currentDist = Math.floor(Math.sqrt((Math.pow(stationB[0] - stationA[0],2) + Math.pow(stationB[1] - stationA[1],2))) * 100) / 100;

          return accum + currentDist;
        } else return accum;
      }, 0);

      //finialzing rails between stations
      state.railsList = [...state.railsList,
      {
        from: state.startStation,
        to: payload,
        path: state.currentRail,
        dist: distance
      }
      ];
    },
    clearRail: state => {
      state.currentRail = [];
    },
  }
});

export const { setMode, addStation, deleteStation,
               setStartStation, addRail, deleteLastRail, endCurrenRail, clearRail } = metrinoSlice.actions;

export const metrinoSelector = state => state.metrino;

export default metrinoSlice.reducer;