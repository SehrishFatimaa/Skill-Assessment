import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserName = () => {
    const [user, setUser]= useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newUser, setNewUser] = useState('');
    const navigate = useNavigate();


    const changeUserName = (e)=>{
      e.preventDefault();
        axios.post('http://localhost:3500/ChangeName', {user, password, newUser, email}).then
        ((res)=>{
          if(res.data.msg==='rename successfull'){
            localStorage.removeItem('user');
            localStorage.setItem('user',res.data.data);
            setUser(res.data.data);
            navigate('/home');
  
          }
        })
    }

    useEffect(()=>{
      setEmail(localStorage.getItem('email'));
    },[email])

  return (
    <div>
        <div>
        <label htmlFor='user'>User Name:</label>
        <input id='user' type="text" value={user} onChange={(e) => setUser(e.target.value)} />
      </div>
      <div>
        <label htmlFor='newUser'>New User Name:</label>
        <input id='newUser' type="text" value={newUser} onChange={(e) => setNewUser(e.target.value)} />
      </div>
      <div>
        <label htmlFor='pass'>Password:</label>
        <input id='pass' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={(e)=>changeUserName(e)}>change user name</button>
    </div>
  )
}

export default UserName