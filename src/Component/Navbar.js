import React from 'react';
import { useRouter } from 'react-router-dom';

const Navbar = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleSignUpClick = () => {
    router.push('/signup');
  };

  return (
    <div>
      <h1>This is Navbar</h1>
      <button onClick={handleLoginClick}>LOGIN</button>
      <button onClick={handleSignUpClick}>SIGN UP</button>
    </div>
  );
};

export default Navbar;
