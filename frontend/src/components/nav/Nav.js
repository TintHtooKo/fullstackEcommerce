import React, { useEffect, useState } from 'react'
import './Nav.css'
import { Link, useNavigate } from 'react-router-dom'
import Cart from '../../assets/cart_icon.png'
import Bar from '../../assets/bar.png'
import Logo from '../../assets/logo.avif'
import axios from 'axios'

export default function Nav() {
    const [menuOpen,setMenuOpen] = useState(false)
    const [authenticated, setAuthenticated] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Check if the access token exists in local storage
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, []);

    const handleLogout = async () => {
        try {
        // Send a POST request to the logout endpoint
        await axios.post('http://localhost:8000/api/logout/');
        // Redirect the user to the login page or any other appropriate page
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setAuthenticated(false);
            navigate('/login');
        } catch (error) {
        // Handle any errors if necessary
        console.error('Logout failed:', error);
        }
    };

    const handleLogin = async () => {
        try{
            setAuthenticated(true)
            navigate('/product')
        }catch (error) {
            // Handle login errors
            console.error('Login failed:', error);
        }
    };

    const clickOpen = () =>{
        setMenuOpen(!menuOpen)
    }
  return (
    <>
    <nav>
        <div><h1 className='logo'><Link to='/'><img src={Logo}/></Link></h1></div>
        <div className='res-mob'>
            <img className='cart' src={Cart}/>            
            <div onClick={clickOpen}>
                <img className='bar' src={Bar} width='50px' height='50px'/>
            </div> 
        </div> 
        <ul className={menuOpen ? "open" : " "}>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/product'>Product</Link></li>
            <li><Link to='/men'>Men</Link></li>
            <li><Link to='/women'>Women</Link></li>
            <li><Link to='/kid'>Kid</Link></li>
            {localStorage.getItem('accessToken') ? (
                        <li><button className='button' onClick={handleLogout}>Logout</button></li>
                    ) : (
                        <li><Link to='/login' className='button'>Login</Link></li>
                    )}
            <li>
                <div className='res'>
                    <img className='cart' src={Cart}/>            
                </div> 
            </li>
        </ul>
            
    </nav>
      
    </>
  )
}
