import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createWithdrawal } from '../../redux/slices/userSlice';
import DashboardLayout from '../../components/DashboardLayout';
import './Wallet.css';

const Wallet = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [amount, setAmount] = useState('');

  const handleWithdrawal = async (e) => {
    e.preventDefault();
    
    const withdrawalAmount = parseFloat(amount);
    
    if (!amount || withdrawalAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    if (user.walletBalance <= 0) {
      alert('Your wallet balance is zero. Cannot create withdrawal request.');
      return;
    }
    
    if (withdrawalAmount > user.walletBalance) {
      alert('Insufficient balance');
      return;
    }
    
    if (withdrawalAmount < 100) {
      alert('Minimum withdrawal amount is ₹100');
      return;
    }

    console.log('[Wallet] Submitting withdrawal:', withdrawalAmount);
    const result = await dispatch(createWithdrawal(withdrawalAmount));
    console.log('[Wallet] Withdrawal result:', result);
    
    if (result.type === 'user/createWithdrawal/fulfilled') {
      setAmount('');
      alert('Withdrawal request submitted successfully! Check "My Withdrawals" page.');
    }
  };

  return (
    <DashboardLayout>
      <div className="wallet-container">
        <h1>Wallet</h1>
        
        <div className="wallet-balance">
          <h2>Available Balance</h2>
          <p className="balance-amount">₹{user?.walletBalance || 0}</p>
        </div>

        <div className="withdrawal-form">
          <h3>Request Withdrawal</h3>
          {user?.walletBalance > 0 ? (
            <form onSubmit={handleWithdrawal}>
              <div className="form-group">
                <label>Amount (Minimum: ₹100)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  required
                  min="100"
                  max={user?.walletBalance}
                />
              </div>
              <button type="submit" className="btn btn-primary">Submit Request</button>
            </form>
          ) : (
            <div className="no-balance-message">
              <p>Your wallet balance is zero. You cannot create a withdrawal request at this time.</p>
              <p>Start earning by purchasing plans and referring others!</p>
            </div>
          )}
        </div>

        <div className="bank-details-note">
          <p>Note: Make sure your bank details are updated in your profile before requesting withdrawal.</p>
          <p>Check your withdrawal requests in <strong>"My Withdrawals"</strong> page.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Wallet;
