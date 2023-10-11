import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Home = () => {

    const navigate = useNavigate()
    const [user,setUser] = useState('');

    useEffect(()=>{
        const email = localStorage.getItem('user');
        console.log(email);
        if(email){
            setUser(email);
        }
    },[user])

    const handlyLogout =()=>{
        localStorage.removeItem('email');
        localStorage.removeItem('user');
        navigate('/')
    }
  return (
    <div>
        <h1>welcome {user}</h1>
        <button onClick={handlyLogout}>logout</button>
        <button onClick={()=>{navigate('/changeUserName')}}>change user name</button>
        <button onClick={()=>{navigate('/changePass')}}>change password</button>

    </div>
  )
}
export default Home;