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

    const handleLinkClick = () => {
        // Close the menu when a link is clicked
        setMenuOpen(false);
    };

    const isAuthenticated = localStorage.getItem('accessToken');

    const CartHandler = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
          navigate('/login');
        } else {
          navigate(`/cart`);
        }
      };
  return (
    <nav>
    <div className='nav'>
        <div><h1 className='logo'><Link to='/'><img src={Logo}/></Link></h1></div>
        <div className='res-mob'>
            <img className='cart' src={Cart}/>            
            <div onClick={clickOpen}>
                <img className='bar' src={Bar}/>
            </div>  
        </div> 
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/product'>Product</Link></li>
            <li><Link to='/men'>Men</Link></li>
            <li><Link to='/women'>Women</Link></li>
            <li><Link to='/kid'>Kid</Link></li>
        </ul>
        <ul className='mobile'>
        <li>
            <div className='res'>
                <Link to='/cart'><img onClick={CartHandler} className='cart' src={Cart}/> </Link>           
            </div> 
        </li>
        {localStorage.getItem('accessToken') ? (
                        <>
                            <li><Link to='/profile' style={{textDecoration:'underline'}}>{username}</Link></li>
                            <li><button className='button' onClick={handleLogout}>Logout</button></li>                           
                        </>
                    ) : (
                        <li><Link to='/login' className='button'>Login</Link></li>
                    )}
        </ul>           
    </div>
        <div className='mobile'>
            <ul  className={menuOpen ? "open" : " "}>
            <li><Link onClick={handleLinkClick} to='/'>Home</Link></li>
            <li><Link onClick={handleLinkClick} to='/product'>Product</Link></li>
            <li><Link onClick={handleLinkClick} to='/men'>Men</Link></li>
            <li><Link onClick={handleLinkClick} to='/women'>Women</Link></li>
            <li><Link onClick={handleLinkClick} to='/kid'>Kid</Link></li>
            {localStorage.getItem('accessToken') ? (
                        <>
                            <li><Link to='/profile' style={{textDecoration:'underline'}}>{username}</Link></li>
                            <li><button className='button' onClick={handleLogout}>Logout</button></li>                           
                        </>
                    ) : (
                        <li><Link to='/login' className='button'>Login</Link></li>
                    )}
            </ul>
        </div>
    </nav>
  )
}
