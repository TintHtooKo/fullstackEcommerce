import React, { useEffect, useState } from 'react'
import './ProductDetail.css'
import Demo from '../../assets/product.png'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

export default function ProductDetail() {

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

  return (
    <div className='detail'>
      <div className='product-image'>
        <img src={`http://localhost:8000${detail.image}`}/>
      </div>
      <div className='product-detail'>
        <h1>{detail.name}</h1>
        <div className='price'>
          <h3 className='new-price'>$ {detail.old_price}</h3>
          <h3 className='old-price'>{detail.new_price}</h3>
        </div>
        <p>
        {detail.desc}
        </p>
        <div className='bbtn'>
          <Link to='/checkout'>Buy</Link>
          <button><i className="fas fa-shopping-cart"></i></button>
        </div>
      </div>
    </div>
  )
}
 