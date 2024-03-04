import React from 'react'
import './Item.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Item(props) {

  const navigate = useNavigate()
  const onClickHandler =(e)=>{
    e.preventDefault()
    console.log(props.id);
    navigate(`/productDetail/${props.id}`)
  }
  return (
    <div className="item" onClick={onClickHandler}>
        <img src={props.image} />
      <p>{props.name}</p>
      <div className="item-price">
        <div className="item-price-new">${props.new_p}</div>
        <div className="item-price-old">{props.old_p}</div>
      </div>
    </div>
  )
}
