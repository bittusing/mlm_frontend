import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import Sidebar from './Sidebar';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role={user?.role} />
      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-left">
            <h2>Welcome, {user?.name}</h2>
            {user?.referralCode && (
              <p className="referral-code-header">
                Referral Code: <strong>{user.referralCode}</strong>
              </p>
            )}
          </div>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
