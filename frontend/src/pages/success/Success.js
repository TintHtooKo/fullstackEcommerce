import React from 'react'
import './Success.css'
import SuccessImg from '../../assets/success.png'
import { Link } from 'react-router-dom'

export default function Success() {
  return (
    <div className='success'>
      <img src={SuccessImg}/>
      <h1>Order Success</h1>
      <Link to='/product'>Continue Shopping</Link>
      {/* <div className='all'>
        <div className='success-detail'>
          <div className='data'>
            <h2>Order Detail</h2>
            <h5>Product Name</h5>
            <h5>Order Amount</h5>
            <h5>Order Date</h5>         
          </div>
          <div className='dash'>
            <h2> </h2>
            <h5>-</h5>
            <h5>-</h5>
            <h5>-</h5>          
          </div>
          <div className='data-detail'>
            <h2> </h2>
            <h5>product 3</h5>
            <h5>$20</h5>
            <h5>18.2.2024</h5>         
          </div>
        </div>
        <div className='address'>
          <h5>Address</h5>
          <p>Your React component looks good! It seems like you're creating a component called Success that displays an image and a heading. Just one thing to note, since Success is used both as the name of the component and the name of the imported image, you might want to consider renaming one of them to avoid confusion.</p>
        </div>
      </div> */}
    </div>
  )
}
 