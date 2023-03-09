import React from 'react';
import { useState, useEffect } from 'react';

const Signup = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const createUser = () => {
    fetch("http://localhost:8080/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password, username: username })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === "OK") {
          console.log("success");
        } else {
          console.log("server error");
        }
      })
  }

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }

  return (
    <div>
    <h1>Welcome to the sign up page.</h1>
    <label>Email:</label>
    <input type="text" onChange={handleEmail} />
    <label>Password:</label>
    <input type="password" onChange={handlePassword} />
    <label>Username:</label>
    <input type="text" onChange={handleUsername} />
    <button onClick={createUser}>Sign up</button>
    </div>
  )
}

export default Signup;