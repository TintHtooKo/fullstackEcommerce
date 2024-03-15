import React, { useEffect, useState } from 'react'
import './ProductDetail.css'
import Demo from '../../assets/product.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function ProductDetail() {

  const navigate = useNavigate()
  const isAuthenticated = localStorage.getItem('accessToken');
  const [detail,setDetail] = useState([])
  const{id} = useParams()
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
          <button>
            <i className='fas fa-shopping-cart'></i>
          </button>
        </div>
      </div>
    </div>
  ) 
}
 