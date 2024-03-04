import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className="register">
      <div className="register-container">
        <h1 className='text-center mb-3'>Register</h1>
        <div className="register-fields">
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <button>Register</button>
          <p className="register-login">
            Already have an account? <span><Link to='/login'>Login Here!</Link></span>
          </p>

        </div>
      </div>
    </div>
  )
}
