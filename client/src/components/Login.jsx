import React, { useState } from 'react';
import axios from 'axios';
import Signup from './signup';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      console.log('Logged in:', response.data.token);
      alert("Log in Successful!");
      window.location.href = '/logout';
    } catch (error) {
      console.error('Error:', error.response.data.message);
      alert("Invalid Username or password!");
    }
  };

  return (
    <div>
      <h1>LOGIN</h1>
      <div className='form'>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <p>Dont have an account?</p>
        <button onClick={() => { window.location.href = "/signup"; }}>Register</button>
      </div>
     
     
      
    </div>
  );
};

export default Login;
