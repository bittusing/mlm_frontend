import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminDashboard } from '../../redux/slices/adminSlice';
import DashboardLayout from '../../components/DashboardLayout';
import './Dashboard.css';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAdminDashboard());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <h3>Total Users</h3>
            <p className="stat-value">{dashboard?.totalUsers || 0}</p>
          </div>
          <div className="admin-stat-card">
            <h3>Active Plans</h3>
            <p className="stat-value">{dashboard?.totalActivePlans || 0}</p>
          </div>
          <div className="admin-stat-card">
            <h3>Total Business Volume</h3>
            <p className="stat-value">₹{dashboard?.totalBusinessVolume || 0}</p>
          </div>
          <div className="admin-stat-card">
            <h3>Total Payout</h3>
            <p className="stat-value">₹{dashboard?.totalPayout || 0}</p>
          </div>
          <div className="admin-stat-card">
            <h3>Pending Withdrawals</h3>
            <p className="stat-value">{dashboard?.pendingWithdrawals || 0}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
