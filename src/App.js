import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './redux/slices/authSlice';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Plans from './pages/public/Plans';
import Contact from './pages/public/Contact';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

// User Pages
import UserDashboard from './pages/user/Dashboard';
import UserProfile from './pages/user/Profile';
import BuyPlan from './pages/user/BuyPlan';
import MyPlans from './pages/user/MyPlans';
import Income from './pages/user/Income';
import Wallet from './pages/user/Wallet';
import MyTeam from './pages/user/MyTeam';
import TeamTree from './pages/user/TeamTree';
import MyWithdrawals from './pages/user/MyWithdrawals';
import PaymentHistory from './pages/user/PaymentHistory';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import PlanManagement from './pages/admin/PlanManagement';
import WithdrawalManagement from './pages/admin/WithdrawalManagement';
import CommissionSettings from './pages/admin/CommissionSettings';
import Reports from './pages/admin/Reports';

// Components
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  // Don't show loading screen, let pages load
  // if (loading) {
  //   return <div className="loading">Loading...</div>;
  // }

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/user/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/user/dashboard" />} />

        {/* User Routes */}
        <Route path="/user/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
        <Route path="/user/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
        <Route path="/user/buy-plan" element={<PrivateRoute><BuyPlan /></PrivateRoute>} />
        <Route path="/user/my-plans" element={<PrivateRoute><MyPlans /></PrivateRoute>} />
        <Route path="/user/income" element={<PrivateRoute><Income /></PrivateRoute>} />
        <Route path="/user/wallet" element={<PrivateRoute><Wallet /></PrivateRoute>} />
        <Route path="/user/team" element={<PrivateRoute><MyTeam /></PrivateRoute>} />
        <Route path="/user/team-tree" element={<PrivateRoute><TeamTree /></PrivateRoute>} />
        <Route path="/user/payment-history" element={<PrivateRoute><PaymentHistory /></PrivateRoute>} />
        <Route path="/user/my-withdrawals" element={<PrivateRoute><MyWithdrawals /></PrivateRoute>} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
        <Route path="/admin/plans" element={<AdminRoute><PlanManagement /></AdminRoute>} />
        <Route path="/admin/withdrawals" element={<AdminRoute><WithdrawalManagement /></AdminRoute>} />
        <Route path="/admin/commission-settings" element={<AdminRoute><CommissionSettings /></AdminRoute>} />
        <Route path="/admin/reports" element={<AdminRoute><Reports /></AdminRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
