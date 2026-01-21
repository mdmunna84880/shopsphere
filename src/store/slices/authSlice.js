import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

import { loginUser, registerUser } from 'services/api';

const token = localStorage.getItem("userToken");

const initialState = {
  token: token,
  isAuthenticated: !!token,
  username: localStorage.getItem("userName"),
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);
      return { token: data.token, username: credentials.username };
    } catch (err) {
      if (isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Login failed");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUser(userData);
      return data;
    } catch (err) {
      if (isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Registration failed");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.username = null;
      state.status = 'idle';
      state.error = null;
      
      localStorage.removeItem("userToken");
      localStorage.removeItem("userName");
    },
    
    clearAuthError(state) {
      state.error = null;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Login Cases
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.isAuthenticated = true;

        localStorage.setItem("userToken", action.payload.token);
        localStorage.setItem("userName", action.payload.username);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        state.error = (action.payload) || 'Login failed';
      })
      // Register cases
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload) || 'Registration failed';
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;