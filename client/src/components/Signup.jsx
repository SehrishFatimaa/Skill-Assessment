import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; 

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/signup', { username, password });
      console.log('User registered successfully');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error:', error.response.data.message);
    }
  };

  return (
    <div>
      <h1>SIGNUP</h1>
      <div className='form'>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">SignUp</button>
      </form>
      <p>Don't Have an Account?</p>
        <button onClick={() => { window.location.href = "/login"; }} >Login</button>
      </div>
     
      
    </div>
  );
};

export default Signup;
