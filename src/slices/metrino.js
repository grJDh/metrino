import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  stationsList: [[500, 500]],

  railsList: [],
  currentRail: [],
}

const metrinoSlice = createSlice({
  name: 'metrino',
  initialState,
  reducers: {
    addStation: (state, { payload }) => {
      state.stationsList = 
      [...state.stationsList, 
        [payload[0], payload[1]]
      ];
    },
    removeStation: (state, { payload }) => {
      state.stationsList = state.stationsList.filter((coords, i) => i !== payload);
    },
  }
});

export const { addStation, removeStation } = metrinoSlice.actions;

export const metrinoSelector = state => state.metrino;

export default metrinoSlice.reducer;