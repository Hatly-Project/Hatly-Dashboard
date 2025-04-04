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
    filteredUsers: [],
  },
  reducers: {
     
    setFilteredUsers: (state, action) => {
      state.filteredUsers = action.payload;
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
        state.filteredUsers = action.payload.users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.UsersLoading = false;
        state.UsersError = action.error.message;
      });
  },
});
export { fetchUsers };
export const { setFilteredUsers } = usersSlice.actions;
export default usersSlice.reducer;
