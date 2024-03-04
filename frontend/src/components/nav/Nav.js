import React, { useState } from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'
import Cart from '../../assets/cart_icon.png'
import Bar from '../../assets/bar.png'
import Logo from '../../assets/logo.avif'

export default function Nav() {
    const [menuOpen,setMenuOpen] = useState(false)

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
            <li><Link to='/login' className='button'>Login</Link></li>
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
