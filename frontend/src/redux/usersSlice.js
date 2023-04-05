import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  selectedUser: null,
  loggedInUser: null
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      action.payload.forEach(user => {
        const existingUser = state.users.find(u => u._id === user._id);
        if (existingUser) {
          Object.assign(existingUser, user);
        } else {
          state.users.push(user);
        }
      })
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const userIndex = state.users.findIndex(u => u._id === action.payload._id);
      if (userIndex >= 0) {
        state.users[userIndex] = action.payload;
      }
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    }
  }
})

export default usersSlice.reducer;
export const { setUsers, addUser, updateUser, setSelectedUser, setLoggedInUser } = usersSlice.actions;