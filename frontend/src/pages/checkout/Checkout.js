import React, { useEffect, useState } from 'react'
import './Checkout.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function Checkout() {
  const navigate = useNavigate()
  const [buyDetail,setBuyDetail] = useState([])
  const [qty,setQty] = useState(1);
  
  const{id} = useParams()
  useEffect(()=>{
    axios
    .get(`http://localhost:8000/api/product/detail/${id}`)
    .then((resp)=>{
      setBuyDetail(resp.data)
    })
    .catch((err)=>[
      console.log(err)
    ])
  },[])

  const [payment,setPayment] = useState([])

useEffect(()=>{
  axios
  .get('http://localhost:8000/api/payment/')
  .then((resp)=>{
    setPayment(resp.data)
  })
  .catch((err)=>{
    console.log(err)
  })
},[])


  const [data,setData] = useState({
    name: '',
    email: '',
    phone:'',
    address: '',
    product:buyDetail.name || '',
    total_price:'',
    payment:payment.name,
    qty:'1',
 } )

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8000/api/checkout/create/', data);
    console.log('Response:', response.data);
    navigate('/success');
  } catch (error) {
    console.log('Error:', error);
  }
  // console.log(data);
};

 const qtyHandler = (e) =>{
  const newQty = parseInt(e.target.value)
  setQty(newQty)
} 

useEffect(() => {
  const totalPrice = qty * buyDetail.new_price;
  setData((prevData) => ({
    ...prevData,
    total_price: totalPrice,
  }));
}, [qty, buyDetail]);

useEffect(() => {
  if (buyDetail && buyDetail.name) {
    setData((prevData) => ({
      ...prevData,
      product: buyDetail.name,
    }));
  }
}, [buyDetail]);



 const handleChange = (e) => {
  const { name, value } = e.target;
  setData((prevData) => ({
    ...prevData,
    [name]: value,
}));
};




  return (
    <div className='checkout'>
        <h1>Checkout</h1>
        <hr/>
        <div className='check'>
            <img src={`http://localhost:8000${buyDetail.image}`}/>
            <form className='inform was-validated' onSubmit={handleSubmit}>
              <label className='form-label' >Name</label>
              <input className='form-control' name='name' type='text' onChange={handleChange} required/>

              <label className='form-label'>Email</label>
              <input className='form-control' type='email' name='email' onChange={handleChange}  required/>

              <label className='form-label'>Phone</label>
              <input className='form-control ph' type='number' name='phone' onChange={handleChange}  required/>

              <label className='form-label'>Address</label>
              <textarea className='form-control mb-3' name='address' onChange={handleChange} required></textarea>

              <label className='form-label'>Product</label>
              <input className='form-control' type='text' name='product' onChange={handleChange} value={buyDetail.name || ''} />

              <label className='form-label'>Qty</label>
              <input className='form-control' type='number' name='qty' onChange={(e)=>{handleChange(e);qtyHandler(e);}} value={qty || ''}   required/>

              <label className='form-label'>Price</label>
              <input className='form-control' type='text' name='total_price' onChange={handleChange} value={'$' + data.total_price} readOnly />

              <label className='form-label'>Payment Method</label>
              <select className='form-control mb-4' onChange={handleChange} name='payment'>
                {payment.map((payment) => (
                  <option key={payment.id} value={payment.id}>{payment.name}</option>
                ))}
              </select>
              <button type='submit'>Checkout</button>
            </form>
        </div>
    </div>
  )
}

