import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';
const fetchDeals = createAsyncThunk('deals/fetchDeals', async () => {
    const response = await axiosInstance.get('/deal',
        // {
        //     headers:{
        //         Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        //     }
        // }
    );
    return response.data;
});
const dealsSlice = createSlice({
    name: 'deals',
    initialState: {
        deals: [],
        dealsLoading: false,
        DealsError: null
    },
    reducers : {},
    extraReducers: (builder) => {    
        builder
        .addCase(fetchDeals.pending, (state) => {
            state.dealsLoading = true;
            state.DealsError = null;
        })
        .addCase(fetchDeals.fulfilled, (state, action) => {
            state.dealsLoading = false;
            state.deals = action.payload;
        })
        .addCase(fetchDeals.rejected, (state, action) => {
            state.dealsLoading = false;
            state.DealsError = action.payload;
        });
    }
})

export { fetchDeals };
export default dealsSlice.reducer;