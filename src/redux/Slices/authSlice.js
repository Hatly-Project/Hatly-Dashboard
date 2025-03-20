import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

const login = createAsyncThunk(
    "auth/login",
    async (data , {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post("/auth/login", data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)
const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:false,
        error:null,
        loginSuccess:false
    },
    reducers:{
        changeLoginSuccess:(state)=>{
            state.loginSuccess=false
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.user=action.payload;
            state.loginSuccess=true;
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }
})

export { login };
export const { changeLoginSuccess } = authSlice.actions;
export default authSlice.reducer