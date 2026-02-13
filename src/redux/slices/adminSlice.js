import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import API_URL, { getAuthConfig } from '../../config/api';

const getConfig = getAuthConfig;

export const getAdminDashboard = createAsyncThunk('admin/getDashboard', async () => {
  const { data } = await axios.get(`${API_URL}/admin/dashboard`, getConfig());
  return data;
});

export const getAllUsers = createAsyncThunk('admin/getAllUsers', async (params) => {
  const { data } = await axios.get(`${API_URL}/admin/users`, { ...getConfig(), params });
  return data;
});

export const blockUser = createAsyncThunk('admin/blockUser', async (userId) => {
  const { data } = await axios.put(`${API_URL}/admin/users/${userId}/block`, {}, getConfig());
  toast.success('User blocked');
  return data;
});

export const unblockUser = createAsyncThunk('admin/unblockUser', async (userId) => {
  const { data } = await axios.put(`${API_URL}/admin/users/${userId}/unblock`, {}, getConfig());
  toast.success('User unblocked');
  return data;
});

export const createPlan = createAsyncThunk('admin/createPlan', async (planData) => {
  const { data } = await axios.post(`${API_URL}/admin/plans`, planData, getConfig());
  toast.success('Plan created');
  return data;
});

export const getWithdrawals = createAsyncThunk('admin/getWithdrawals', async (status) => {
  const { data } = await axios.get(`${API_URL}/admin/withdrawals`, { ...getConfig(), params: { status } });
  return data;
});

export const approveWithdrawal = createAsyncThunk('admin/approveWithdrawal', async (id) => {
  const { data } = await axios.put(`${API_URL}/admin/withdrawals/${id}/approve`, {}, getConfig());
  toast.success('Withdrawal approved');
  return data;
});

export const rejectWithdrawal = createAsyncThunk('admin/rejectWithdrawal', async ({ id, remarks }) => {
  const { data } = await axios.put(`${API_URL}/admin/withdrawals/${id}/reject`, { remarks }, getConfig());
  toast.success('Withdrawal rejected');
  return data;
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    dashboard: null,
    users: [],
    withdrawals: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDashboard.fulfilled, (state, action) => {
        state.dashboard = action.payload.data;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
      })
      .addCase(getWithdrawals.fulfilled, (state, action) => {
        state.withdrawals = action.payload.withdrawals;
      });
  }
});

export default adminSlice.reducer;
