import React, { useEffect, useState } from 'react'
import './Women.css'
import Item from '../../components/item/Item'
import axios from 'axios'

export default function Women() {
  const [women,setWomen] = useState([])
  useEffect(()=>{
    axios
    .get('http://localhost:8000/api/women/')
    .then((resp)=>{
      setWomen(resp.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])
  return (
    <div className='women'>
    <h1>Women Collections</h1>
    <hr/>
    <div className='women-collections'>
    {
      women.map((women,index)=>(
        <Item id={women.id} key={index} name={women.name} image={`http://localhost:8000${women.image}`} old_p={women.old_price} new_p={women.new_price}/>
      ))
    }
    </div>
  </div>
  )
}
