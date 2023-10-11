import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    const email2 = localStorage.getItem('email');
    if(email2){
        navigate('/home');
    }
},[user])

  const handleLogin = async () => {
    console.log('inside login');

      axios.post('http://localhost:3500/login', {email, password, user}).then
      ((res)=>{
        if(res.data.msg==='login successfull'){
          localStorage.setItem('email',res.data.data.email);
          localStorage.setItem('user',res.data.data.user);
          navigate('/home')

        }
        else if(res.data==='account with this email does not exist'){
          setResponse(res.data);
        }
      })
   
  };

  const handleSignup = async () => {

      axios.post('http://localhost:3500/signup', {email, password, user}).then
      ((res)=>{
        if(res.data.msg==='signup successfull'){
          localStorage.setItem('email',res.data.data.email);
          localStorage.setItem('user',res.data.data.user);
          navigate('/home');
        }
        else if(res.data==='account with this email already exists'){
          setResponse(res.data);
        }
      })
   
  };



  return (
    <div>
      <h2>Login / Signup</h2>
      <div>
        <label htmlFor='user'>User Name:</label>
        <input id='user' type="text" value={user} onChange={(e) => setUser(e.target.value)} />
      </div>
      <div>
        <label htmlFor='email'>Email:</label>
        <input id='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor='pass'>Password:</label>
        <input id='pass' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={(event)=>handleLogin(event)}>Login</button>
        <button onClick={(event)=>handleSignup(event)}>Signup</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <strong>:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default Login;
