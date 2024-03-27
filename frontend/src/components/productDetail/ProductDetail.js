import React, { useEffect, useState } from 'react'
import './ProductDetail.css'
import Demo from '../../assets/product.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../cartContext/cartContext'

export default function ProductDetail() {

  const navigate = useNavigate()
  const isAuthenticated = localStorage.getItem('accessToken');
  const [detail,setDetail] = useState([])
  const{id} = useParams()
  const {cartCount,updateCartCount} = useCart()
  useEffect(()=>{
    axios
    .get(`http://localhost:8000/api/product/detail/${id}`)
    .then((resp)=>{
      setDetail(resp.data)
    })
    .catch((err)=>[
      console.log(err)
    ])
  },[])

  

  const addToCartHandler = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/cart/create/${id}`, null, {
        headers: {
          Authorization: `Bearer ${isAuthenticated}`,
        },
      });
      updateCartCount(cartCount + 1);
      alert('Product added to cart!');
      console.log('Success:', response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect the user to the login page if not authenticated
        navigate('/login');
      } else {
        console.error('Error adding to cart:', error);
      }
    }
  };



  const checkoutHandler = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      // Redirect the user to the login page if not authenticated
      navigate('/login');
    } else {
      navigate(`/checkout/${id}`);
    }
  };


  return (
    <div className='detail'>
      <div className='product-image'>
        <img src={`http://localhost:8000${detail.image}`}/>
      </div>
      <div className='product-detail'>
        <h1>{detail.name}</h1>
        <div className='price'>
          <h3 className='new-price'>$ {detail.new_price}</h3>
          <h3 className='old-price'>{detail.old_price}</h3>
        </div>
        <p>
        {detail.desc}
        </p>
        <div className='bbtn'>
          <button className='buy' onClick={checkoutHandler}>
            Buy
          </button>
          <button onClick={addToCartHandler}>
            <i className='fas fa-shopping-cart'></i>
          </button>
        </div>
      </div>
    </div>
  ) 
}
 