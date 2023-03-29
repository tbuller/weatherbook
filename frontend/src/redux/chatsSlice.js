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
      state.selectedChat = action.payload[0];
    },
    addChat: (state, action) => {
      state.chats.push(action.payload);
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    updateChat: (state, action) => {
      const chatIndex = state.chats.findIndex(c => c._id === action.payload._id);
      if (chatIndex >= 0) {
        state.chats[chatIndex] = action.payload
      }
    }
  }
})

export default chatsSlice.reducer;
export const { setChats, addChat, setSelectedChat, updateChat } = chatsSlice.actions;