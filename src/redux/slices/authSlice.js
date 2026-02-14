import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import API_URL from '../../config/api';

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/register`, userData);
    localStorage.setItem('token', data.token);
    toast.success('Registration successful!');
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Registration failed');
    return rejectWithValue(error.response?.data);
  }
});

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/login`, credentials);
    localStorage.setItem('token', data.token);
    toast.success('Login successful!');
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Login failed');
    return rejectWithValue(error.response?.data);
  }
});

export const loadUser = createAsyncThunk('auth/loadUser', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  } catch (error) {
    localStorage.removeItem('token');
    return rejectWithValue(error.response?.data);
  }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (profileData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await axios.put(`${API_URL}/users/profile`, profileData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    toast.success('Profile updated successfully!');
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Profile update failed');
    return rejectWithValue(error.response?.data);
  }
});

export const changePassword = createAsyncThunk('auth/changePassword', async (passwordData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await axios.put(`${API_URL}/users/change-password`, passwordData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    toast.success('Password changed successfully!');
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Password change failed');
    return rejectWithValue(error.response?.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'), // Set true if token exists
    loading: true // Start with loading true
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      toast.info('Logged out successfully');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loadUser.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(changePassword.fulfilled, (state) => {
        // Password changed, no state update needed
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
