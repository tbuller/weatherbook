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
    }, 
    updateComment: (state, action) => {
      const commentIndex = state.comments.findIndex(c => c._id === action.payload._id);
      if (commentIndex >= 0) {
        state.comments[commentIndex] = action.payload;
      }
    }
  }
})

export default commentSlice.reducer;
export const { setComments, addComment, updateComment } = commentSlice.actions;