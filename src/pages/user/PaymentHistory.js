import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../../redux/slices/userSlice';
import DashboardLayout from '../../components/DashboardLayout';
import './PaymentHistory.css';

const PaymentHistory = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.user);
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const filteredTransactions = transactions.filter(txn => {
    const matchesFilter = filter === 'ALL' || txn.category === filter;
    const matchesSearch = txn.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCategoryIcon = (category) => {
    const icons = {
      'ROI': '💰',
      'DIRECT_REFERRAL': '👥',
      'LEVEL_INCOME': '📊',
      'PLAN_PURCHASE': '🛒',
      'WITHDRAWAL': '💸',
      'ADMIN_CREDIT': '✅',
      'ADMIN_DEBIT': '❌'
    };
    return icons[category] || '📝';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'ROI': '#27ae60',
      'DIRECT_REFERRAL': '#3498db',
      'LEVEL_INCOME': '#9b59b6',
      'PLAN_PURCHASE': '#e74c3c',
      'WITHDRAWAL': '#e67e22',
      'ADMIN_CREDIT': '#1abc9c',
      'ADMIN_DEBIT': '#c0392b'
    };
    return colors[category] || '#95a5a6';
  };

  const getTotalByCategory = (category) => {
    return transactions
      .filter(txn => txn.category === category && txn.type === 'CREDIT')
      .reduce((sum, txn) => sum + txn.amount, 0);
  };

  return (
    <DashboardLayout>
      <div className="payment-history-container">
        <h1>Complete Payment History</h1>
        <p className="subtitle">Track all your earnings, investments, and withdrawals</p>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card roi">
            <div className="card-icon">💰</div>
            <div className="card-content">
              <h3>ROI Income</h3>
              <p className="amount">₹{getTotalByCategory('ROI').toLocaleString()}</p>
            </div>
          </div>
          <div className="summary-card referral">
            <div className="card-icon">👥</div>
            <div className="card-content">
              <h3>Direct Referral</h3>
              <p className="amount">₹{getTotalByCategory('DIRECT_REFERRAL').toLocaleString()}</p>
            </div>
          </div>
          <div className="summary-card level">
            <div className="card-icon">📊</div>
            <div className="card-content">
              <h3>Level Income</h3>
              <p className="amount">₹{getTotalByCategory('LEVEL_INCOME').toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'ALL' ? 'active' : ''}`}
              onClick={() => setFilter('ALL')}
            >
              All Transactions
            </button>
            <button 
              className={`filter-btn ${filter === 'ROI' ? 'active' : ''}`}
              onClick={() => setFilter('ROI')}
            >
              ROI
            </button>
            <button 
              className={`filter-btn ${filter === 'DIRECT_REFERRAL' ? 'active' : ''}`}
              onClick={() => setFilter('DIRECT_REFERRAL')}
            >
              Direct Referral
            </button>
            <button 
              className={`filter-btn ${filter === 'LEVEL_INCOME' ? 'active' : ''}`}
              onClick={() => setFilter('LEVEL_INCOME')}
            >
              Level Income
            </button>
            <button 
              className={`filter-btn ${filter === 'PLAN_PURCHASE' ? 'active' : ''}`}
              onClick={() => setFilter('PLAN_PURCHASE')}
            >
              Investments
            </button>
            <button 
              className={`filter-btn ${filter === 'WITHDRAWAL' ? 'active' : ''}`}
              onClick={() => setFilter('WITHDRAWAL')}
            >
              Withdrawals
            </button>
          </div>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Transactions List */}
        <div className="transactions-list">
          {filteredTransactions.length === 0 ? (
            <div className="no-transactions">
              <p>No transactions found</p>
            </div>
          ) : (
            filteredTransactions.map((txn) => (
              <div key={txn._id} className={`transaction-item ${txn.type.toLowerCase()}`}>
                <div className="txn-icon" style={{ backgroundColor: getCategoryColor(txn.category) }}>
                  {getCategoryIcon(txn.category)}
                </div>
                <div className="txn-details">
                  <h4>{txn.description}</h4>
                  <div className="txn-meta">
                    <span className="txn-category">{txn.category.replace(/_/g, ' ')}</span>
                    <span className="txn-date">{new Date(txn.createdAt).toLocaleString()}</span>
                  </div>
                  {txn.metadata && (
                    <div className="txn-metadata">
                      {txn.metadata.referredUserName && (
                        <span>From: {txn.metadata.referredUserName}</span>
                      )}
                      {txn.metadata.originalUserName && (
                        <span>From: {txn.metadata.originalUserName}</span>
                      )}
                      {txn.metadata.level && (
                        <span>Level: {txn.metadata.level}</span>
                      )}
                      {txn.metadata.percentage && (
                        <span>Rate: {txn.metadata.percentage}%</span>
                      )}
                      {txn.metadata.planAmount && (
                        <span>Plan: ₹{txn.metadata.planAmount.toLocaleString()}</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="txn-amount">
                  <span className={`amount ${txn.type.toLowerCase()}`}>
                    {txn.type === 'CREDIT' ? '+' : '-'}₹{txn.amount.toLocaleString()}
                  </span>
                  <span className="balance">Balance: ₹{txn.balanceAfter.toLocaleString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PaymentHistory;
