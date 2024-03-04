import React, { useEffect, useState } from 'react'
import './ProductItems.css'
import Item from '../item/Item'
import axios from 'axios'

export default function ProductItems() {
  const [product,setProduct] = useState([])
  useEffect(()=>{
    axios
    .get('http://localhost:8000/api/product/')
    .then((resp)=>{
      setProduct(resp.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])
  return (
    <div className='productItems'>
        <h1>
            All Products
        </h1><hr/>
        <div className='productCollections'>
            {
              product.map((pro,index)=>(
                <Item id={pro.id} key={index} name={pro.name} image={`http://localhost:8000${pro.image}`} old_p={pro.old_price} new_p={pro.new_price}/>
              ))
            }
        </div> 
    </div>
  )
}
