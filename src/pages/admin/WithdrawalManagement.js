import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWithdrawals, approveWithdrawal, rejectWithdrawal } from '../../redux/slices/adminSlice';
import DashboardLayout from '../../components/DashboardLayout';
import './WithdrawalManagement.css';

const WithdrawalManagement = () => {
  const dispatch = useDispatch();
  const { withdrawals } = useSelector((state) => state.admin);
  const [filter, setFilter] = useState('PENDING');

  useEffect(() => {
    dispatch(getWithdrawals(filter));
  }, [dispatch, filter]);

  const handleApprove = (id) => {
    if (window.confirm('Approve this withdrawal?')) {
      dispatch(approveWithdrawal(id)).then(() => {
        dispatch(getWithdrawals(filter));
      });
    }
  };

  const handleReject = (id) => {
    const remarks = prompt('Enter rejection reason:');
    if (remarks) {
      dispatch(rejectWithdrawal({ id, remarks })).then(() => {
        dispatch(getWithdrawals(filter));
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="withdrawal-management">
        <h1>Withdrawal Management</h1>
        
        <div className="filter-tabs">
          <button onClick={() => setFilter('PENDING')} className={filter === 'PENDING' ? 'active' : ''}>
            Pending
          </button>
          <button onClick={() => setFilter('APPROVED')} className={filter === 'APPROVED' ? 'active' : ''}>
            Approved
          </button>
          <button onClick={() => setFilter('REJECTED')} className={filter === 'REJECTED' ? 'active' : ''}>
            Rejected
          </button>
        </div>

        <div className="withdrawals-table">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Amount</th>
                <th>Bank Details</th>
                <th>Date</th>
                <th>Status</th>
                {filter === 'PENDING' && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((withdrawal) => (
                <tr key={withdrawal._id}>
                  <td>{withdrawal.userId?.name}</td>
                  <td>₹{withdrawal.amount}</td>
                  <td>
                    {withdrawal.bankDetails?.accountNumber}<br />
                    {withdrawal.bankDetails?.ifscCode}
                  </td>
                  <td>{new Date(withdrawal.createdAt).toLocaleString()}</td>
                  <td><span className={`status ${withdrawal.status.toLowerCase()}`}>{withdrawal.status}</span></td>
                  {filter === 'PENDING' && (
                    <td>
                      <button onClick={() => handleApprove(withdrawal._id)} className="btn btn-success">
                        Approve
                      </button>
                      <button onClick={() => handleReject(withdrawal._id)} className="btn btn-danger">
                        Reject
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WithdrawalManagement;
