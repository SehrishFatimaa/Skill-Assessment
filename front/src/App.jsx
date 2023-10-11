
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/login/login'
import Home from './components/home/home'
import UserName from './components/change/userName'
import Password from './components/change/password'
function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/changeUserName' element={<UserName />}/>
      <Route path='/changePass' element={<Password />}/>

    </Routes>
    </>
  )
}

export default App
