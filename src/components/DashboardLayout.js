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
          <h2>Welcome, {user?.name}</h2>
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
