import React from 'react'
import './Footer.css'
import Logo from '../../assets/logo.avif'


export default function Footer() {
  return (
    <div className='footer'>
        <div className='logo'>
            <img src={Logo}/>
        </div>
        <div className='contact'>
            <h3>Get In Touch</h3>
            <form>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' className='form-control mb-2' required/>
                <label htmlFor='email'>Email</label>
                <input type='email' id='name' className='form-control mb-2' required/>
                <label htmlFor='message'>Message</label><br/>
                <textarea id='message' className='form-control'></textarea>
            </form>
        </div>
    </div>
  )
}
