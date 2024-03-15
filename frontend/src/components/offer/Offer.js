import React from 'react'
import './Offer.css'
import exclusive_img from '../../assets/exclusive_image.png';
import { Link } from 'react-router-dom';
export default function Offer() {
  return (
    <div className="offer">
    <div className="offer-left">
      <h1>Exclusive</h1>
      <h1>Offer For You</h1>
      <p>ONLY ON BEST SELLER PRODUCTS</p>
      <button><Link to='product'>Check Now</Link></button>
    </div>
    <div className="offer-right">
      <img src={exclusive_img} />
    </div>
  </div>
  )
} 
