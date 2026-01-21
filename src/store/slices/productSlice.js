import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  fetchAllProducts, 
  fetchProductById, 
  fetchCategories, 
  fetchProductsByCategory 
} from 'services/api';
import { isAxiosError } from 'axios';

const initialState= {
  items: [],
  selectedProduct: null,
  categories: [],
  status: 'idle',
  error: null,
};

// Getting all products
export const getProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, {rejectWithValue}) => {
    try{
      const response = await fetchAllProducts();
      return response;
    }catch(err){
      if(isAxiosError(err)){
        return rejectWithValue(err.response?.data || "Failed to load, Try again");
      }
      return rejectWithValue("An unexpected error happens");
    }
  }
);

// Getting one products via Id
export const getProductDetails = createAsyncThunk(
  'products/fetchDetails',
  async (id, {rejectWithValue}) => {
    try{
      const response = await fetchProductById(id);
      return response;
    }catch(err){
      if(isAxiosError(err)){
        return rejectWithValue(err.response?.data || "Failed to load, Try again")
      }
      return rejectWithValue("Failed to fetch categories")
    }
  }
);

// Getting all categories list
export const getCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, {rejectWithValue}) => {
    try{
      const response = await fetchCategories();
      return response;
    }catch(err){
      if(isAxiosError(err)){
        return rejectWithValue(err.response?.data || "Failed to load, Try again")
      }
      return rejectWithValue("Failed to fetch categories")
    }
  }
);

// Getting all products by category
export const getProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category, {rejectWithValue}) => {
    try{
      const response = await fetchProductsByCategory(category);
      return response;
    }catch(err){
      if(isAxiosError(err)){
        return rejectWithValue(err.response?.data || "Failed to load, Try again")
      }
      return rejectWithValue("Failed to fetch categories")
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Getting all product cases
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Getting single product cases
      .addCase(getProductDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Getting categories list cases
      .addCase(getCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Getting product via selected category cases
      .addCase(getProductsByCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;