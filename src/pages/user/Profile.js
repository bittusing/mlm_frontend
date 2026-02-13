import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import './Profile.css';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    accountNumber: user?.bankDetails?.accountNumber || '',
    ifscCode: user?.bankDetails?.ifscCode || '',
    bankName: user?.bankDetails?.bankName || '',
    accountHolderName: user?.bankDetails?.accountHolderName || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch update profile action
    alert('Profile update functionality to be implemented');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    // Dispatch change password action
    alert('Password change functionality to be implemented');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <DashboardLayout>
      <div className="profile-container">
        <h1>Profile</h1>
        
        <div className="profile-info">
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Referral Code:</strong> {user?.referralCode}</p>
          <p><strong>Member Since:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <h3>Personal Information</h3>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          </div>

          <h3>Bank Details</h3>
          <div className="form-group">
            <label>Account Number</label>
            <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>IFSC Code</label>
            <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Bank Name</label>
            <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Account Holder Name</label>
            <input type="text" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-primary">Update Profile</button>
        </form>

        <form onSubmit={handlePasswordSubmit} className="profile-form" style={{ marginTop: '30px' }}>
          <h3>Change Password</h3>
          <div className="form-group">
            <label>Current Password</label>
            <div className="password-input-wrapper">
              <input 
                type={showCurrentPassword ? "text" : "password"} 
                name="currentPassword" 
                value={passwordData.currentPassword} 
                onChange={handlePasswordChange}
                required 
              />
              <span 
                className="password-toggle-icon" 
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="form-group">
            <label>New Password</label>
            <div className="password-input-wrapper">
              <input 
                type={showNewPassword ? "text" : "password"} 
                name="newPassword" 
                value={passwordData.newPassword} 
                onChange={handlePasswordChange}
                required 
              />
              <span 
                className="password-toggle-icon" 
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <div className="password-input-wrapper">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                name="confirmPassword" 
                value={passwordData.confirmPassword} 
                onChange={handlePasswordChange}
                required 
              />
              <span 
                className="password-toggle-icon" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Change Password</button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
