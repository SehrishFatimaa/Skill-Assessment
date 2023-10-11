// import logo from './logo.svg';
import './App.css';
import Login from './Component/Login';
import Navbar from './Component/Navbar';
import SignUp from './Component/SignUp';

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Login />
        <SignUp />
      </div>
    </>
  );
}
export default App;
