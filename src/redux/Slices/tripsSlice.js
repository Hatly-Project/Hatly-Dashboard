import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

const fetchTrips = createAsyncThunk(
    "trips/fetchTrips",
    async () => {
        const response = await axiosInstance.get("/trip",
            // {
            //     headers:{
            //         Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            //     }
            // }
        );
        return response.data;
    }
)
const tripsSlice= createSlice({
    name:"trips",
    initialState:{
        trips:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTrips.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchTrips.fulfilled,(state,action)=>{
            state.loading=false;
            state.trips=action.payload;
        })
        .addCase(fetchTrips.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }

})
export { fetchTrips };
export default tripsSlice.reducer;