import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DashboardLayout from '../../components/DashboardLayout';
import axios from 'axios';
import API_URL from '../../config/api';
import './MyWithdrawals.css';

const MyWithdrawals = () => {
  const [withdrawals, setWithdrawals] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${API_URL}/users/withdrawals`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Withdrawals:', data);
      setWithdrawals(data.withdrawals || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching withdrawals:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'PENDING': '#ffc107',
      'APPROVED': '#28a745',
      'REJECTED': '#dc3545'
    };
    return colors[status] || '#6c757d';
  };

  return (
    <DashboardLayout>
      <div className="my-withdrawals-container">
        <h1>My Withdrawal Requests</h1>
        
        {loading ? (
          <div className="loading-message">Loading withdrawals...</div>
        ) : withdrawals.length === 0 ? (
          <div className="no-withdrawals">
            <p>No withdrawal requests yet</p>
            <p>Go to Wallet to create a withdrawal request</p>
          </div>
        ) : (
          <div className="withdrawals-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Bank Details</th>
                  <th>Status</th>
                  <th>Processed Date</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((withdrawal) => (
                  <tr key={withdrawal._id}>
                    <td>{new Date(withdrawal.createdAt).toLocaleString()}</td>
                    <td className="amount">₹{withdrawal.amount.toLocaleString()}</td>
                    <td>
                      <div className="bank-info">
                        <div>{withdrawal.bankDetails?.accountNumber}</div>
                        <div className="small-text">{withdrawal.bankDetails?.bankName}</div>
                        <div className="small-text">{withdrawal.bankDetails?.ifscCode}</div>
                      </div>
                    </td>
                    <td>
                      <span 
                        className="status-badge" 
                        style={{ backgroundColor: getStatusColor(withdrawal.status) }}
                      >
                        {withdrawal.status}
                      </span>
                    </td>
                    <td>
                      {withdrawal.processedAt 
                        ? new Date(withdrawal.processedAt).toLocaleString() 
                        : '-'}
                    </td>
                    <td>{withdrawal.remarks || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyWithdrawals;
