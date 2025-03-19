import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

const login = createAsyncThunk(
    "auth/login",
    async (data) => {
        const response = await axiosInstance.post("/auth/login", data);
 
        console.log("response", response.data);
        
        return response.data;
    }
)
const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
    }
})

export { login };
export default authSlice.reducer