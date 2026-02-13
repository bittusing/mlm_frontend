import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import API_URL, { getAuthConfig } from '../../config/api';

const getConfig = getAuthConfig;

export const getDashboard = createAsyncThunk('user/getDashboard', async () => {
  const { data } = await axios.get(`${API_URL}/users/dashboard`, getConfig());
  return data;
});

export const getPlans = createAsyncThunk('user/getPlans', async () => {
  const { data } = await axios.get(`${API_URL}/plans`);
  return data;
});

export const purchasePlan = createAsyncThunk('user/purchasePlan', async (planId) => {
  const { data } = await axios.post(`${API_URL}/plans/purchase`, { planId }, getConfig());
  toast.success('Plan purchased successfully!');
  return data;
});

export const getMyPlans = createAsyncThunk('user/getMyPlans', async () => {
  const { data } = await axios.get(`${API_URL}/plans/my-plans`, getConfig());
  return data;
});

export const getTransactions = createAsyncThunk('user/getTransactions', async () => {
  const { data } = await axios.get(`${API_URL}/users/transactions`, getConfig());
  return data;
});

export const getIncome = createAsyncThunk('user/getIncome', async () => {
  const { data } = await axios.get(`${API_URL}/users/income`, getConfig());
  return data;
});

export const createWithdrawal = createAsyncThunk('user/createWithdrawal', async (amount, { rejectWithValue }) => {
  try {
    console.log('[Frontend] Creating withdrawal request for amount:', amount);
    const { data } = await axios.post(`${API_URL}/users/withdrawals`, { amount }, getConfig());
    console.log('[Frontend] Withdrawal response:', data);
    toast.success(data.message || 'Withdrawal request submitted!');
    return data;
  } catch (error) {
    console.error('[Frontend] Withdrawal error:', error.response?.data);
    toast.error(error.response?.data?.message || 'Withdrawal request failed');
    return rejectWithValue(error.response?.data);
  }
});

export const getTeam = createAsyncThunk('user/getTeam', async () => {
  const { data } = await axios.get(`${API_URL}/users/team/direct`, getConfig());
  return data;
});

export const getTeamTree = createAsyncThunk('user/getTeamTree', async () => {
  const { data } = await axios.get(`${API_URL}/users/team/tree`, getConfig());
  return data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    dashboard: null,
    plans: [],
    myPlans: [],
    transactions: [],
    income: null,
    team: [],
    teamTree: null,
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboard.fulfilled, (state, action) => {
        state.dashboard = action.payload.data;
      })
      .addCase(getPlans.fulfilled, (state, action) => {
        state.plans = action.payload.plans;
      })
      .addCase(getMyPlans.fulfilled, (state, action) => {
        state.myPlans = action.payload.plans;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload.transactions;
      })
      .addCase(getIncome.fulfilled, (state, action) => {
        state.income = action.payload.income;
      })
      .addCase(getTeam.fulfilled, (state, action) => {
        state.team = action.payload.referrals;
      })
      .addCase(getTeamTree.fulfilled, (state, action) => {
        state.teamTree = action.payload.tree;
      });
  }
});

export default userSlice.reducer;
