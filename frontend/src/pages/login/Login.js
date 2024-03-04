import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className="loginup">
      <div className="loginup-container">
        <h1 className='text-center mb-3'>Login</h1>
        <div className="loginup-fields">
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <button>Login</button>
          <p className="loginup-login">
            Do you have an account? <span><Link to='/register'>Register Here!</Link></span>
          </p>

        </div>
      </div>
    </div>
  )
}
