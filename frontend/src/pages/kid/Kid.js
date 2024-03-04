import React, { useEffect, useState } from 'react'
import './Kid.css'
import Item from '../../components/item/Item'
import axios from 'axios'

export default function Kid() {
  const [kid,setKid] = useState([])
  useEffect(()=>{
    axios
    .get('http://localhost:8000/api/kid/')
    .then((resp)=>{
      setKid(resp.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])
  
  return (
    <div className='kid'>
    <h1>Kids Collections</h1>
    <hr/>
    <div className='kid-collections'>
    {
      kid.map((kid,index)=>(
        <Item id={kid.id} key={index} name={kid.name} image={`http://localhost:8000${kid.image}`} old_p={kid.old_price} new_p={kid.new_price}/>
      ))
    }
    </div>
  </div>
  )
}
