import React from 'react';
import { useState, useEffect } from 'react';

const Signup = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailDuplicate, setEmailDuplicate] = useState(false);
  const [usernameDuplicate, setUsernameDuplicate] = useState(false);

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
          navigate("/login");
        } else if (data.message === "email already in use") {
          setUsernameDuplicate(false);
          setEmailDuplicate(true);
        } else if (data.message === "username already in use") {
          setEmailDuplicate(false);
          setUsernameDuplicate(true);
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
    {emailDuplicate && <div>email already used to sign up, please log in to continue</div>}
    {usernameDuplicate && <div>username already is use, please choose another username or log in if you have already created an account</div>}
    </div>
  )
}

export default Signup;