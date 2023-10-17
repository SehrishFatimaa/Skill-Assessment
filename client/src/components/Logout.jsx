import React from "react";
import axios from "axios";

const Logout = () => {
  const handleLogout = async () => {
    const userinput = prompt("Are you sure you want to Logout?(Yes/No)");
    try {
      await axios.post("http://localhost:5000/logout");
      delete axios.defaults.headers.common["Authorization"];
      alert({ userinput });
      if (userinput && userinput.toLowerCase() === "yes") {
        alert("Logging out..");
        window.location.href = "/login";
      } else if (userinput && userinput.toLowerCase() === "no") {
        alert("Cancelled Logout");
      } else {
        alert("Invalid Input");
      }
    } catch (error) {
      console.error("error:", error);
    }
  };
  return (
    <>
      <h1>Welcome to the Homepage</h1>
      <hr />
      <h2>Do you want to update your password?</h2>
      <button onClick={() => { window.location.href = "/update-password"; }}>Update</button>

      <div className="logoutt">
        <h2>Do you want to logout?</h2>
        <hr />
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default Logout;
