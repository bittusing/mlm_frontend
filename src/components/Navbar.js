import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">MLM App</Link>
        
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/plans">Plans</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          
          {!isAuthenticated ? (
            <>
              <li><Link to="/login" className="btn-login">Login</Link></li>
              <li><Link to="/register" className="btn-register">Register</Link></li>
            </>
          ) : (
            <>
              <li>
                <Link to={user?.role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard'}>
                  Dashboard
                </Link>
              </li>
              <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
