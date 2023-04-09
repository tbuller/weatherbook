import { createSlice } from '@reduxjs/toolkit';

const initialState =  {
  pokes: []
}

const pokesSlice = createSlice({
  name: "pokes",
  initialState,
  reducers: {
    setPokes: (state, action) => {
      state.pokes = action.payload;
    },
    addPoke: (state, action) => {
      state.pokes.push(action.payload);
    }
  }
})

export default pokesSlice.reducer;
export const { setPokes, addPoke } = pokesSlice.actions;