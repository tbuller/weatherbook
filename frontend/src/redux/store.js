import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import postsReducer from './postsSlice';
import commentsReducer from './commentsSlice';
import chatsReducer from './chatsSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
    chats: chatsReducer
  },
})

export default store;