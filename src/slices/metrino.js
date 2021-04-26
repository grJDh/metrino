import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  stationsList: [],
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
  }
});

export const { addStation } = metrinoSlice.actions;

export const metrinoSelector = state => state.metrino;

export default metrinoSlice.reducer;