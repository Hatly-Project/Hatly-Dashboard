import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

const getUserDetails = createAsyncThunk(
    "userDetails/getUserDetails",
    async (userId) => {
        console.log(userId, "userId");
        const response = await axiosInstance?.get(`/user/${userId}`);
        console.log(response.data.user, "response.data");
        return response.data.user;
    }
);

const updateUserDetails = createAsyncThunk(
    "userDetails/updateUserDetails",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.patch(`/user/${data.userId}`, data);
        return response.data;
      } catch (error) {
       return rejectWithValue(error.response.data.message);
      }
    }
);

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState: {
        user: {},
        UserDetailsLoading: false,
        UserDetailsError: null,
        updateLoading: false,
        updateError: null,
        success: false
    },
    reducers: {}, 
    extraReducers: (builder) => {
        builder
        .addCase(getUserDetails.pending, (state) => {
            state.UserDetailsLoading = true;
            state.UserDetailsError = null;
        })
        .addCase(getUserDetails.fulfilled, (state, action) => {
            state.UserDetailsLoading = false;
            state.user = action.payload;
        })
        .addCase(getUserDetails.rejected, (state, action) => {
            state.UserDetailsLoading = false;
            state.UserDetailsError = action.error.message;
        })
        .addCase(updateUserDetails.pending, (state, action) => {
            state.updateLoading = true;
            state.updateError = null;
            state.success = false;
            // state.user = action.payload;
        })
        .addCase(updateUserDetails.fulfilled, (state, action) => {
            state.updateLoading = false;
            state.user= action.payload;
            state.success = true;
        })
        .addCase(updateUserDetails.rejected, (state, action) => {
            console.error("Update Failed:", action.error.message);

            state.updateLoading = false;
            state.updateError = action.payload;
            state.success = false;
        });
    } 
    });

export { getUserDetails, updateUserDetails };
export default userDetailsSlice.reducer;