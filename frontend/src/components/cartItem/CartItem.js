import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

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

export default function CartItem() {
  const Authenticated = useAuth();
  const [cart, setCart] = useState([]);
  const{id} = useParams()
  const navigate = useNavigate();
  const fetchCart = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:8000/api/cart', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCart(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    if (Authenticated) {
      fetchCart();
    }
  }, [Authenticated]);  // Fetch cart whenever the user changes

  const removeFromCart = async (productId) => {
    try {
      if (!productId || typeof productId !== 'number') {
        console.error('Invalid productId:', productId);
        return; // Exit the function early if productId is invalid
      }
      const accessToken = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:8000/api/cart/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // After removing from cart, fetch updated cart data
      fetchCart();
      alert("Remove cart successfully");
    } catch (error) {
      console.error('Error removing from cart:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  const navigateToDetail = (productId) => {
    navigate(`/productDetail/${productId}`);
  };

  
  return (
    <div>
      {cart && cart.length === 0 ? (
        <p className='text-center'>No items in cart</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
            <th scope="col"></th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {cart && cart.map((item,id) => (
              // image,product,price and pro_id are from backend view cart
              <tr key={id}>
                <th></th>
                <th scope="row">
                  <img src={`http://localhost:8000${item.image}`} style={{ width: '50px', height: '50px' }} alt="Product" />
                </th>
                <td>{item.product}</td>
                <td>$ {item.price}</td>
                <td>
                  <button 
                  style={{background:'yellow',color:'black',border:'none',padding:'10px 15px',borderRadius:'10px'}} 
                  onClick={() => navigateToDetail(item.pro_id)}>Detail</button>
                  <button 
                  style={{background:'red',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px',marginLeft:'10px'}} 
                  onClick={() => removeFromCart(item.id)}>
                    Delete
                  </button>                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
