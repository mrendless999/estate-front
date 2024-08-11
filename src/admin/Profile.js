import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = ({ profile }) => {
  const [profileData, setProfileData] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setProfileData(profile);
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/admins/${profileData.id}`, profileData);
      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileData(profile); // Optionally reset to the original profile data
  };

  if (!profileData) {
    return <div>Loading profile...</div>; // Handle loading state
  }

  return (
    <div className="profwhole">
      <div className="profile-container">
        <h1>My Profile</h1>
        <form className="profile-form">
          <div className="profile-form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={profileData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={profileData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-form-group">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              value={profileData.role}
              disabled
            />
          </div>
          <div className="profile-form-actions">
            {isEditing ? (
              <>
                <button type="button" onClick={handleSave}>
                  Save
                </button>
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <button type="button" onClick={handleEdit}>
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
