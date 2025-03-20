import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

const fetchShipments = createAsyncThunk(
    "shipment/fetchShipments",
    async () => {
        const response = await axiosInstance.get("/shipment",
            // {
            //     headers:{
            //         Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            //     }
            // }
        );
        return response.data;
    }
)
const shipmentSlice = createSlice({
    name: "shipment",
    initialState: {
        shipments: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShipments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchShipments.fulfilled, (state, action) => {
                state.loading = false;
                state.shipments = action.payload;
            })
            .addCase(fetchShipments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default shipmentSlice.reducer;
export { fetchShipments };