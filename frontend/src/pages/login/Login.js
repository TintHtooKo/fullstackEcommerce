import React, { useEffect, useState } from 'react'
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const locationState = useLocation().state;
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (locationState && locationState.successMessage) {
      setSuccessMessage(locationState.successMessage);
    }
  }, [locationState]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('Please enter both username and password.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/login/', formData);
      console.log(response.data); // Handle success
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      navigate('/product');
    } catch (error) {
      setError('Invalid username or password.'); // Handle error
    }
  };
  return (
    <div className="loginup">
      <div className="loginup-container">
        <h1 className='text-center mb-3'>Login</h1>
        {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError(null)} aria-label="Close"></button>
                  </div>}
        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {successMessage}
            <button type="button" className="btn-close" onClick={() => setSuccessMessage(null)} aria-label="Close"></button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="loginup-fields">
          <input type="text" name='username' placeholder="Username" onChange={handleChange} />
          <input type="password" name='password' placeholder="Password" onChange={handleChange} />
          <button className='but'>Login</button>
          <p className="loginup-login">
            Do you have an account? <span><Link to='/register'>Register Here!</Link></span>
          </p>
          <p><Link to='/forgetpw'>Forget Password</Link></p>

        </form>
      </div>
    </div>
  )
}
