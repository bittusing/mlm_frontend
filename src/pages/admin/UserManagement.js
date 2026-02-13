import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, blockUser, unblockUser } from '../../redux/slices/adminSlice';
import DashboardLayout from '../../components/DashboardLayout';
import './UserManagement.css';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getAllUsers({ search }));
  }, [dispatch, search]);

  const handleBlock = (userId) => {
    if (window.confirm('Are you sure you want to block this user?')) {
      dispatch(blockUser(userId)).then(() => {
        dispatch(getAllUsers({ search }));
      });
    }
  };

  const handleUnblock = (userId) => {
    dispatch(unblockUser(userId)).then(() => {
      dispatch(getAllUsers({ search }));
    });
  };

  return (
    <DashboardLayout>
      <div className="user-management">
        <h1>User Management</h1>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name, email, or referral code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Referral Code</th>
                <th>Investment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.referralCode}</td>
                  <td>₹{user.totalInvestment}</td>
                  <td>
                    <span className={`status ${user.isBlocked ? 'blocked' : 'active'}`}>
                      {user.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td>
                    {user.isBlocked ? (
                      <button onClick={() => handleUnblock(user._id)} className="btn btn-success">
                        Unblock
                      </button>
                    ) : (
                      <button onClick={() => handleBlock(user._id)} className="btn btn-danger">
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
