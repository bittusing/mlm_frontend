import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from '../../redux/slices/userSlice';
import DashboardLayout from '../../components/DashboardLayout';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  const COLORS = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'];

  const formatCurrency = (value) => `₹${value.toLocaleString()}`;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(user?.referralCode || '');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getTransactionIcon = (category) => {
    const icons = {
      'ROI': '💰',
      'DIRECT_REFERRAL': '👥',
      'LEVEL_COMMISSION': '🎯',
      'WITHDRAWAL': '💸',
      'INVESTMENT': '📊'
    };
    return icons[category] || '💵';
  };

  return (
    <DashboardLayout>
      <div className="dashboard-overview">
        <h1>Dashboard Overview</h1>
        
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card stat-wallet">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>Wallet Balance</h3>
              <p className="stat-value">{formatCurrency(dashboard?.walletBalance || 0)}</p>
            </div>
          </div>
          <div className="stat-card stat-investment">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>Total Investment</h3>
              <p className="stat-value">{formatCurrency(dashboard?.totalInvestment || 0)}</p>
            </div>
          </div>
          <div className="stat-card stat-roi">
            <div className="stat-icon">💎</div>
            <div className="stat-info">
              <h3>Total ROI Earned</h3>
              <p className="stat-value">{formatCurrency(dashboard?.totalROI || 0)}</p>
            </div>
          </div>
          <div className="stat-card stat-commission">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <h3>Total Commission</h3>
              <p className="stat-value">{formatCurrency(dashboard?.totalCommission || 0)}</p>
            </div>
          </div>
          <div className="stat-card stat-referrals">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>Direct Referrals</h3>
              <p className="stat-value">{dashboard?.directReferrals || 0}</p>
            </div>
          </div>
          <div className="stat-card stat-team">
            <div className="stat-icon">🌐</div>
            <div className="stat-info">
              <h3>Total Team Size</h3>
              <p className="stat-value">{dashboard?.teamSize || 0}</p>
            </div>
          </div>
        </div>

        {/* Referral Section */}
        <div className="referral-section">
          <div className="referral-header">
            <h3>🎁 Your Referral Code</h3>
            <p>Share this code to earn referral income</p>
          </div>
          <div className="referral-code-container">
            <div className="referral-code">{user?.referralCode}</div>
            <button onClick={copyReferralCode} className="btn-copy">
              {copiedCode ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          {/* Income Trend Chart */}
          <div className="chart-card">
            <h3>📈 Income Trend (Last 6 Months)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dashboard?.incomeTrend || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="totalIncome" stroke="#2ecc71" strokeWidth={2} name="Income" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Income Breakdown Chart */}
          <div className="chart-card">
            <h3>💰 Income Breakdown (Last 30 Days)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={dashboard?.incomeBreakdown || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry._id}: ₹${entry.total}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="total"
                >
                  {(dashboard?.incomeBreakdown || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Section */}
        <div className="activity-section">
          {/* Active Plans */}
          <div className="activity-card">
            <h3>📊 Active Plans</h3>
            <div className="plans-list">
              {dashboard?.activePlans?.length > 0 ? (
                dashboard.activePlans.map((plan) => (
                  <div key={plan._id} className="plan-item">
                    <div className="plan-info">
                      <strong>{plan.planId?.name || 'N/A'}</strong>
                      <span className="plan-amount">{formatCurrency(plan.amount)}</span>
                    </div>
                    <div className="plan-date">
                      Started: {formatDate(plan.createdAt)}
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data">No active plans</p>
              )}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="activity-card">
            <h3>💳 Recent Transactions</h3>
            <div className="transactions-list">
              {dashboard?.recentTransactions?.length > 0 ? (
                dashboard.recentTransactions.slice(0, 5).map((txn) => (
                  <div key={txn._id} className={`transaction-item ${txn.type.toLowerCase()}`}>
                    <div className="txn-icon">{getTransactionIcon(txn.category)}</div>
                    <div className="txn-info">
                      <strong>{txn.category.replace(/_/g, ' ')}</strong>
                      <span className="txn-date">{formatDate(txn.createdAt)}</span>
                    </div>
                    <div className={`txn-amount ${txn.type.toLowerCase()}`}>
                      {txn.type === 'CREDIT' ? '+' : '-'}{formatCurrency(txn.amount)}
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data">No recent transactions</p>
              )}
            </div>
          </div>

          {/* Recent Team Members */}
          <div className="activity-card">
            <h3>👥 Recent Team Members</h3>
            <div className="team-list">
              {dashboard?.recentTeamMembers?.length > 0 ? (
                dashboard.recentTeamMembers.map((member) => (
                  <div key={member._id} className="team-member-item">
                    <div className="member-avatar">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="member-info">
                      <strong>{member.name}</strong>
                      <span className="member-email">{member.email}</span>
                    </div>
                    <div className="member-date">
                      {formatDate(member.createdAt)}
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data">No team members yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
