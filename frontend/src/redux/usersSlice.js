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
      console.log(action.payload);
      state.users.push(action.payload);
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
export const { setUsers, addUser, setSelectedUser, setLoggedInUser } = usersSlice.actions;