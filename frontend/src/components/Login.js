import React from 'react';
import { useState, useEffect } from 'react';

const Login = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [incorrect, setIncorrect] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(response => response.json())
      .then(data => setUsers(data.users))
  }, [])

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleLogin = () => {
    const matchesUser = users.find(u => u.email === email && u.password === password);
    if (matchesUser) {
      setIncorrect(false);
      localStorage.setItem("userId", matchesUser._id);
      navigate("/myhome")
    } else {
      setIncorrect(true);
    }
  }

  return (
    <div>
    <h1>Welcome to the login page</h1>
    <label>Email:</label>
    <input type="text" onChange={handleEmail} />
    <label>Password:</label>
    <input type="password" onChange={handlePassword} />
    <button onClick={handleLogin}>Log in</button>
    {incorrect && <div>Wrong username or password, please try again or sign up</div>}
    </div>
  )
}

export default Login;