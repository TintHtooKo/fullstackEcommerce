import React, { useEffect, useState } from 'react'
import './Profile.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

export default function Profile() {
    useAuth()
    const [checkoutHistory, setCheckoutHistory] = useState([]);
    const [error, setError] = useState('');
  
    const fetchCheckoutHistory = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('Authentication token not found');
        }
    
        const response = await axios.get('http://localhost:8000/api/checkout/history', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Response:', response.data); // Log the response data
        if (response.data && Array.isArray(response.data)) {
          setCheckoutHistory(response.data);
          setError('');
        } else {
          throw new Error('Invalid checkout history data format');
        }
      } catch (error) {
        console.error('Error fetching checkout history:', error.message);
        setError('Error fetching checkout history');
      }
    };
    

    useEffect(() => {
      fetchCheckoutHistory();
    }, []);

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
  };
  
  
  
  return (
    <div className='profile'>
      <h1 className='text-center'>Checkout History</h1>
      {error ? (
                <p className='text-center'>{error}</p>
            ) : checkoutHistory.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Product</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Action</th>
                            <th scope="col">Order Data</th>                          
                        </tr>
                    </thead>
                    <tbody>
                        {checkoutHistory.map((checkout,index) =>{
                          console.log(checkout.action.name);
                          return(
                            (
                              <tr key={index}>
                                  <td>{checkout.product}</td>
                                  <td>{checkout.qty}</td>
                                  <td>${checkout.total_price}</td>
                                  <td>{checkout.action.name}</td>
                                  <td>{formatDate(checkout.created_at)}</td>
                              </tr>
                          ))}
                          )
                        }
                    </tbody>
                </table>
            ) : (
                <p>No checkout history available.</p>
            )}
    </div>
  )
}
