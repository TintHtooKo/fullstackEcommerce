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
    const [username,setUsername] = useState('')
    const navigate = useNavigate();

    const fetchUsername = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setUsername(response.data.username);
        } catch (error) {
            console.error('Failed to fetch username:', error);
        }
    };

    

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setAuthenticated(true);
            fetchUsername(); // Fetch username when accessToken changes
        } else {
            setAuthenticated(false);
            setUsername('');
        }
    }, [localStorage.getItem('accessToken')]);
    
    
    



    const handleLogout = async () => {
        try {
        await axios.post('http://localhost:8000/api/logout/');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setAuthenticated(false);
            navigate('/login');
        } catch (error) {
        console.error('Logout failed:', error);
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
                        <>
                            <li><button className='button' onClick={handleLogout}>Logout</button></li>
                            <li>{username}</li>
                        </>
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
