import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIncome, getTransactions } from '../../redux/slices/userSlice';
import DashboardLayout from '../../components/DashboardLayout';
import './Income.css';

const Income = () => {
  const dispatch = useDispatch();
  const { income, transactions } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getIncome());
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <div className="income-container">
        <h1>Income Overview</h1>
        
        <div className="income-stats">
          <div className="income-card">
            <h3>ROI Income</h3>
            <p className="income-value">₹{income?.roi || 0}</p>
          </div>
          <div className="income-card">
            <h3>Direct Referral Income</h3>
            <p className="income-value">₹{income?.directReferral || 0}</p>
          </div>
          <div className="income-card">
            <h3>Level Income</h3>
            <p className="income-value">₹{income?.levelIncome || 0}</p>
          </div>
        </div>

        <h2>Transaction History</h2>
        <div className="transactions-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn._id}>
                  <td>{new Date(txn.createdAt).toLocaleString()}</td>
                  <td><span className={`type ${txn.type.toLowerCase()}`}>{txn.type}</span></td>
                  <td>{txn.category}</td>
                  <td className={txn.type === 'CREDIT' ? 'credit' : 'debit'}>
                    {txn.type === 'CREDIT' ? '+' : '-'}₹{txn.amount}
                  </td>
                  <td>{txn.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Income;
