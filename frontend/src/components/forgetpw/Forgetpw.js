import React, { useState } from 'react'
import './Forgetpw.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Forgetpw() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/reset-password/', {
                email,
                password,
                confirm_password: confirmPassword,
            });
            console.log(response.data.message);
            navigate('/login')
        } catch (error) {
            console.error(error.response.data.error);
            setError(error.response.data.error);
        }
    };
  return (
    <div className="loginup">
      <div className="loginup-container">
        <h1 className='text-center mb-3'>Reset Password</h1>
        {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError(null)} aria-label="Close"></button>
                  </div>}
        <form className="loginup-fields" onSubmit={handleSubmit}>
          <input type="email" name='email' placeholder="Email" onChange={(e) => setEmail(e.target.value)}  value={email}/>
          <input type="password" name='password'  placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
          <input type="password" name='confirm_password'  placeholder="Confirm Password" value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required />
          <button type='submit' className='but'>Reset</button>
       </form>
      </div>
    </div>
  )
}
