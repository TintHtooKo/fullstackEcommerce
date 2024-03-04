import React from 'react'
import './ProductHeader.css'
import Logo from '../../assets/logo.avif'

export default function ProductHeader() {
  return (
    <div className='product'>
      <div className='product-left'>
        <h1>Welcome From</h1>
      </div>
      <div className='product-right'>
        <h2><img src={Logo}/></h2>
      </div>
    </div>
  )
}
