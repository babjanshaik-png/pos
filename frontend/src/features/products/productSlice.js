import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async () => {
    const res = await api.get('/products');
    return res.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  }
});

export default productSlice.reducer;