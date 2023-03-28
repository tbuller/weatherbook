import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chats: [],
  myChats: [],
  selectedChat: null
}

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    addToMyChats: (state, action) => {
      state.myChats.push(action.payload);
    }
  }
})

export default chatsSlice.reducer;
export const { setChats, addToMyChats } = chatsSlice.actions;