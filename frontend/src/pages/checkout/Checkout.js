import React from 'react'
import './Checkout.css'
import Demo from '../../assets/product.png'

export default function Checkout() {
  return (
    <div className='checkout'>
        <h1>Checkout</h1>
        <hr/>
        <div className='check'>
            <img src={Demo}/>
            <form className='inform'>
                <input className='form-control' type='text' placeholder='Name...' required/>
                <input className='form-control' type='email' placeholder='Email...' required/>
                <input className='form-control ph' type='number' placeholder='Phone...'  required/>
                <textarea className='form-control mb-3' placeholder='Address...'></textarea>
                <input className='form-control' type='text' readOnly placeholder='Product Name...' />
                <input className='form-control' type='number' min='1'  placeholder='Quantity...' required/>
                <input className='form-control' type='text' readOnly placeholder='Total price...' />
                <select className='form-control mb-4'>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                <button>Checkout</button>
            </form>
        </div>
    </div>
  )
}
