import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axiosInstance.get(
    "/user"
    // {
    //     headers: {
    //         Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    //     }
    // }
  );
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    UsersLoading: false,
    UsersError: null,
    copyUsers: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload; // Update the users list
      console.log( state.users , "users");
      
    },
    resetUsers: (state) => {
      state.users = state.copyUsers; // Reset the users list
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.UsersLoading = true;
        state.UsersError = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.UsersLoading = false;
        state.users = action.payload.users;
        state.copyUsers = action.payload.users; 
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.UsersLoading = false;
        state.UsersError = action.error.message;
      });
  },
});
export { fetchUsers };
export const { setUsers , resetUsers } = usersSlice.actions;
export default usersSlice.reducer;
