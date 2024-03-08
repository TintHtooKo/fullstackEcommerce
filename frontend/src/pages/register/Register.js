import React, { useState } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  });

  const [error,setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/register/', formData);
      console.log(response.data); // Handle success
      navigate('/login');
    } catch (error) {
      setError("Something was wrong. Please Try Again"); // Handle error
    }
  };
  return (
    <div className="register">
      <div className="register-container">
        <h1 className='text-center mb-3'>Register</h1>
        {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError(null)} aria-label="Close"></button>
                  </div>}
        <form onSubmit={handleSubmit} className="register-fields">
          <input type="text" placeholder="Username" name='username' onChange={handleChange} required />
          <input type="email" placeholder="Email Address" name='email' onChange={handleChange} required />
          <input type="password" placeholder="Password" name='password' onChange={handleChange} required />
          <input type="password" placeholder="Confirm Password" name='confirm_password' onChange={handleChange} required />
          <button className='but' type='submit'>Register</button>
          <p className="register-login">
            Already have an account? <span><Link to='/login'>Login Here!</Link></span>
          </p>

        </form>
      </div>
    </div>
  )
}
