import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaShoppingCart, FaWallet, FaUsers, FaCog, FaChartBar } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ role }) => {
  const location = useLocation();

  const userLinks = [
    { path: '/user/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { path: '/user/profile', icon: <FaUser />, label: 'Profile' },
    { path: '/user/buy-plan', icon: <FaShoppingCart />, label: 'Buy Plan' },
    { path: '/user/my-plans', icon: <FaChartBar />, label: 'My Plans' },
    { path: '/user/income', icon: <FaWallet />, label: 'Income' },
    { path: '/user/payment-history', icon: <FaChartBar />, label: 'Payment History' },
    { path: '/user/wallet', icon: <FaWallet />, label: 'Wallet' },
    { path: '/user/my-withdrawals', icon: <FaWallet />, label: 'My Withdrawals' },
    { path: '/user/team', icon: <FaUsers />, label: 'My Team' },
    { path: '/user/team-tree', icon: <FaUsers />, label: 'Team Tree' }
  ];

  const adminLinks = [
    { path: '/admin/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { path: '/admin/users', icon: <FaUsers />, label: 'Users' },
    { path: '/admin/plans', icon: <FaShoppingCart />, label: 'Plans' },
    { path: '/admin/withdrawals', icon: <FaWallet />, label: 'Withdrawals' },
    { path: '/admin/commission-settings', icon: <FaCog />, label: 'Commission' },
    { path: '/admin/reports', icon: <FaChartBar />, label: 'Reports' }
  ];

  const links = role === 'ADMIN' ? adminLinks : userLinks;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>{role === 'ADMIN' ? 'Admin Panel' : 'User Panel'}</h3>
      </div>
      <ul className="sidebar-menu">
        {links.map((link) => (
          <li key={link.path} className={location.pathname === link.path ? 'active' : ''}>
            <Link to={link.path}>
              {link.icon}
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
