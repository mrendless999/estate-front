import React, { useState } from 'react';
import axios from 'axios';
import './ChangePassword.css';

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!form.newPassword) newErrors.newPassword = 'New password is required';
    if (!form.confirmNewPassword) newErrors.confirmNewPassword = 'Please confirm your new password';
    if (form.newPassword !== form.confirmNewPassword) newErrors.confirmNewPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const admin = JSON.parse(localStorage.getItem('admin')); // Retrieve admin details from local storage
    if (!admin) {
      setErrors({ global: 'Admin not logged in' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/admins/change-password', {
        email: admin.email, // Use logged-in admin email
        oldPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      if (response.status === 200) {
        setMessage('Password changed successfully');
        setForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
        setErrors({});
      }
    } catch (err) {
      setMessage('');
      setErrors({ global: 'Failed to change password. Please try again.' });
      console.error('Password change error:', err);
    }
  };

  return (
    <div className="change-password-container">
      <h1 className='ChangePassword-h1'>Change Password</h1>
      <form className="change-password-form" onSubmit={handleSubmit}>
        <div className="ChangePassword-form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
          />
          {errors.currentPassword && <span className="ChangePassword-error">{errors.currentPassword}</span>}
        </div>
        <div className="ChangePassword-form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
          />
          {errors.newPassword && <span className="ChangePassword-error">{errors.newPassword}</span>}
        </div>
        <div className="ChangePassword-form-group">
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={form.confirmNewPassword}
            onChange={handleChange}
          />
          {errors.confirmNewPassword && <span className="ChangePassword-error">{errors.confirmNewPassword}</span>}
        </div>
        <div className="ChangePassword-form-actions">
          <button type="submit">Change Password</button>
        </div>
        {message && <div className="ChangePassword-message">{message}</div>}
        {errors.global && <div className="ChangePassword-error">{errors.global}</div>}
      </form>
    </div>
  );
};

export default ChangePassword;
