import React, { useEffect, useState } from 'react'
import './NewCollection.css'
import Item from '../item/Item'
import axios from 'axios'


export default function NewCollection() {
  const [collect,setCollect] = useState([])

  useEffect(()=>{
    axios
    .get('http://localhost:8000/api/new_collect/')
    .then((resp)=>{
      setCollect(resp.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])
  return (
    <div className='new-collection'>
        <h1>New Collection</h1>
        <hr/>
        <div className='collection'>
        {
          collect.map((col,index)=>(
            <Item id={col.id} key={index} name={col.name} image={`http://localhost:8000${col.image}`} old_p={col.old_price} new_p={col.new_price}/>
          ))
        }

        </div>
    </div>
  )
}
