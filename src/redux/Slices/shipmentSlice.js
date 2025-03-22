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
        shipmentsLoading: false,
        shipmentsError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShipments.pending, (state) => {
                state.shipmentsLoading = true;
                state.shipmentsError = null;
            })
            .addCase(fetchShipments.fulfilled, (state, action) => {
                state.shipmentsLoading = false;
                state.shipments = action.payload;
            })
            .addCase(fetchShipments.rejected, (state, action) => {
                state.shipmentsLoading = false;
                state.shipmentsError = action.error.message;
            });
    },
});

export default shipmentSlice.reducer;
export { fetchShipments };