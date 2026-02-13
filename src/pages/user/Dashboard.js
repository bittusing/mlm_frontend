import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from '../../redux/slices/userSlice';
import DashboardLayout from '../../components/DashboardLayout';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <div className="dashboard-overview">
        <h1>Dashboard</h1>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Investment</h3>
            <p className="stat-value">₹{dashboard?.totalInvestment || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Total ROI Earned</h3>
            <p className="stat-value">₹{dashboard?.totalROI || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Total Commission</h3>
            <p className="stat-value">₹{dashboard?.totalCommission || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Wallet Balance</h3>
            <p className="stat-value">₹{dashboard?.walletBalance || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Direct Referrals</h3>
            <p className="stat-value">{dashboard?.directReferrals || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Total Team Size</h3>
            <p className="stat-value">{dashboard?.teamSize || 0}</p>
          </div>
        </div>

        <div className="referral-section">
          <h3>Your Referral Code</h3>
          <div className="referral-code">{user?.referralCode}</div>
          <p>Share this code with others to earn referral income</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
