import React, { useState } from 'react';
import axios from 'axios';
import './acc.scss';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/account/token/', {
        //Corrected path
        username,
        password,
      });
      localStorage.setItem('token', response.data.access); // Сохраните токен в localStorage
      alert('Login successful!');
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Login failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Вход</h1>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
