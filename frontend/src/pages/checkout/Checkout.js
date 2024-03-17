import React, { useEffect, useState } from 'react'
import './Checkout.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const useAuth = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated;
};

export default function Checkout() {
  useAuth();
  const{id} = useParams()
  const navigate = useNavigate()
  const [buyDetail,setBuyDetail] = useState([])
  const [qty,setQty] = useState(1);
  const [email,setEmail] = useState('');
  const [username,setUsername] = useState('')
  const [authenticated, setAuthenticated] = useState(false);  
  const [userId,setUserId] = useState('')
  const [payment,setPayment] = useState([])
  const [action,setAction] = useState({})


  // autofill username
  const fetchUsername = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Access token not found');
      }
      const response = await axios.get('http://localhost:8000/api/user/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsername(response.data.username);
      setEmail(response.data.email);
      setUserId(response.data.id);
      console.log(response.data.id);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      // Handle error, such as redirecting to login page
    }
  };
  

useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        setAuthenticated(true);
        fetchUsername(); // Fetch username when accessToken changes
    } else {
        setAuthenticated(false);
        setUsername('');
    }
}, [localStorage.getItem('accessToken')]);

/////////////////////////////////////////
  
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
    name: username || '',
    email: email || '',
    phone:'',
    address: '',
    product:buyDetail.name || '',
    total_price:'',
    payment: payment.name,
    qty:'1',
    user:userId,
    action:{name:'Pending'},
 } )


const handleSubmit = async (e) => {
  e.preventDefault();
  const confirmed = window.confirm(`Are you sure to buy ${buyDetail.name}?`);
  if (confirmed) {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Access token not found');
      }

      const postData = { ...data, user: userId };

      const response = await axios.post(
        'http://localhost:8000/api/checkout/create/',
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.status === 200) {
        console.log('Checkout successful:', response.data);
        navigate('/success');
      } else {
        throw new Error('Checkout failed');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        
      }
      alert('Failed to checkout. Please try again later.');
    }
  } else {
    alert('Checkout canceled.');
  }
  console.log(data);
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

useEffect(() => {
  if (username) {
    setData((prevData) => ({
      ...prevData,
      name: username,
    }));
  }
}, [username]);

useEffect(() => {
  if (email) {
    setData((prevData) => ({
      ...prevData,
      email: email,
    }));
  }
}, [email]);



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
              <input className='form-control' name='name' value={username} type='hidden' onChange={handleChange} required/>

              <input className='form-control' type='hidden' value={email} name='email' onChange={handleChange}  required/>

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

