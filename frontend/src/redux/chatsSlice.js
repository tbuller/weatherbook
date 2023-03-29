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
    addChat: (state, action) => {
      state.chats.push(action.payload);
    }
  }
})

export default chatsSlice.reducer;
export const { setChats, addChat } = chatsSlice.actions;