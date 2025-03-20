import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';
const fetchDeals = createAsyncThunk('deals/fetchDeals', async () => {
    const response = await axiosInstance.get('/deal',
        {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
    );
    return response.data;
});
const dealsSlice = createSlice({
    name: 'deals',
    initialState: {
        deals: [],
        loading: false,
        error: null
    },
    reducers : {},
    extraReducers: (builder) => {    
        builder
        .addCase(fetchDeals.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchDeals.fulfilled, (state, action) => {
            state.loading = false;
            state.deals = action.payload;
        })
        .addCase(fetchDeals.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})

export { fetchDeals };
export default dealsSlice.reducer;