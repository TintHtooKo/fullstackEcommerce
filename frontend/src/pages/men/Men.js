import React, { useEffect, useState } from 'react'
import './Men.css'
import Item from '../../components/item/Item'
import axios from 'axios'


export default function Men() {
  const [men,setMen] = useState([])

  useEffect(()=>{
    axios
    .get('http://localhost:8000/api/men/')
    .then((resp)=>{
      setMen(resp.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])
  return (
    <div className='men'>
      <h1>Men Collections</h1>
      <hr/>
      <div className='men-collections'>
      {
        men.map((men,index)=>(
          <Item id={men.id} key={index} name={men.name} image={`http://localhost:8000${men.image}`} old_p={men.old_price} new_p={men.new_price}/>
        ))
      }
      </div>
    </div>
  )
}
