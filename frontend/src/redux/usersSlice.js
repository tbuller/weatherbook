import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: []
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      console.log(action.payload);
      state.users.push(action.payload);
    },
    setSelectedUser: (state, action) => {
      
    }
  }
})

export default usersSlice.reducer;
export const { setUsers, addUser } = usersSlice.actions;