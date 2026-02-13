import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminDashboard } from '../../redux/slices/adminSlice';
import DashboardLayout from '../../components/DashboardLayout';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAdminDashboard());
  }, [dispatch]);

  const COLORS = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'];

  const formatCurrency = (value) => `₹${value.toLocaleString()}`;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <DashboardLayout>
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card stat-blue">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>Total Users</h3>
              <p className="stat-value">{dashboard?.totalUsers || 0}</p>
            </div>
          </div>
          <div className="admin-stat-card stat-green">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>Active Plans</h3>
              <p className="stat-value">{dashboard?.totalActivePlans || 0}</p>
            </div>
          </div>
          <div className="admin-stat-card stat-purple">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>Business Volume</h3>
              <p className="stat-value">{formatCurrency(dashboard?.totalBusinessVolume || 0)}</p>
            </div>
          </div>
          <div className="admin-stat-card stat-orange">
            <div className="stat-icon">💸</div>
            <div className="stat-info">
              <h3>Total Payout</h3>
              <p className="stat-value">{formatCurrency(dashboard?.totalPayout || 0)}</p>
            </div>
          </div>
          <div className="admin-stat-card stat-red">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>Pending Withdrawals</h3>
              <p className="stat-value">{dashboard?.pendingWithdrawals || 0}</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          {/* User Growth Chart */}
          <div className="chart-card">
            <h3>User Growth (Last 6 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboard?.userGrowth || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#3498db" strokeWidth={2} name="New Users" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Investment Trend Chart */}
          <div className="chart-card">
            <h3>Investment Trend (Last 6 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboard?.investmentTrend || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="totalAmount" fill="#2ecc71" name="Investment Amount" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Commission Breakdown */}
          <div className="chart-card">
            <h3>Commission Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboard?.commissionBreakdown || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry._id}: ₹${entry.total}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="total"
                >
                  {(dashboard?.commissionBreakdown || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="recent-activity-section">
          {/* Recent Users */}
          <div className="activity-card">
            <h3>Recent Joined Users</h3>
            <div className="activity-table-wrapper">
              <table className="activity-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Referral Code</th>
                    <th>Joined Date</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard?.recentUsers?.length > 0 ? (
                    dashboard.recentUsers.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td><strong>{user.referralCode}</strong></td>
                        <td>{formatDate(user.createdAt)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="no-data">No recent users</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Investments */}
          <div className="activity-card">
            <h3>Recent Investments</h3>
            <div className="activity-table-wrapper">
              <table className="activity-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Plan</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard?.recentInvestments?.length > 0 ? (
                    dashboard.recentInvestments.map((investment) => (
                      <tr key={investment._id}>
                        <td>{investment.userId?.name || 'N/A'}</td>
                        <td>{investment.planId?.name || 'N/A'}</td>
                        <td><strong>{formatCurrency(investment.amount)}</strong></td>
                        <td>{formatDate(investment.createdAt)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="no-data">No recent investments</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
