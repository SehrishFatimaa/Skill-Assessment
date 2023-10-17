import React, { useState } from 'react';
import axios from 'axios';

const UpdatePassword = () => {
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdatePassword = () => {
    axios.put(`http://localhost:5000/update-password`, { username, currentPassword, newPassword })
      .then(response => {
        console.log(response.data);
        alert("Password Updated successfully")
      })
      .catch(error => {
        console.error(error);
        alert("Error Updating Password")
      });
  };

  return (
    <div>
      <h1>Update Password</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleUpdatePassword}>Update Password</button>
      <button onClick={() => { window.location.href = "/logout"; }}>Go back to the Homepage</button>
    </div>
  );
};

export default UpdatePassword;
