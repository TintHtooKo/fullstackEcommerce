import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send a POST request to the logout endpoint
      await axios.post('http://localhost:8000/api/logout/');
      // Redirect the user to the login page or any other appropriate page
      navigate('/login');
    } catch (error) {
      // Handle any errors if necessary
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
