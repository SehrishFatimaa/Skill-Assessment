import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserName = () => {
    const [newUser, setNewUser]= useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [changed, setChanged] = useState(false);
    const navigate = useNavigate();

    const changePass = (e)=>{
      e.preventDefault();
      
        axios.post('http://localhost:3500/ChangePass', {newUser, password, newPassword, email}).then
        ((res)=>{
          if(res.data==='password change successfull'){
            navigate('/home')
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
        <input id='user' type="text" value={newUser} onChange={(e) => setNewUser(e.target.value)} />
      </div>
      <div>
        <label htmlFor='pass'>Password:</label>
        <input id='pass' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label htmlFor='pass'>New Password:</label>
        <input id='pass' type="password" value={newPassword} onChange={(e) => setnewPassword(e.target.value)} />
      </div>
      <button onClick={(e)=>changePass(e)}>change password</button>
    </div>
  )
}

export default UserName