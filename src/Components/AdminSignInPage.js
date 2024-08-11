import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminSignInPage.css';

const AdminSignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/admins/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const admin = response.data;
        localStorage.setItem('admin', JSON.stringify(admin)); // Store admin details
        navigate('/admin-dashboard'); // Redirect to admin dashboard
      }
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login error:', err);
    }
  };

  return (
    <div className='AdminSignInPage'>
      <div className="ad-container">
        <div className="ad-signin-form">
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="image-section">
          <img src='/Assets/Images/AdminSignIn.png' alt="Sign In" />
        </div>
      </div>
    </div>
  );
};

export default AdminSignInPage;
