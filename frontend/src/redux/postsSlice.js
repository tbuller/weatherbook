import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: []
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    }
  }
})

export default postsSlice.reducer;
export const { setPosts, addPost } = postsSlice.actions;