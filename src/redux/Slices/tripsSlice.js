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
        TripsLoading:false,
        tripsError:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTrips.pending,(state)=>{
            state.TripsLoading=true;
            state.tripsError=null;
        })
        .addCase(fetchTrips.fulfilled,(state,action)=>{
            state.TripsLoading=false;
            state.trips=action.payload;
        })
        .addCase(fetchTrips.rejected,(state,action)=>{
            state.TripsLoading=false;
            state.tripsError=action.error.message;
        })
    }

})
export { fetchTrips };
export default tripsSlice.reducer;