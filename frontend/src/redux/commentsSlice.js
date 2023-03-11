import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: []
}

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    }
  }
})

export default commentSlice.reducer;
export const { setComments, addComment } = commentSlice.actions;