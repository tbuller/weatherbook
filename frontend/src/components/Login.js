import React from 'react';
import { useState, useEffect } from 'react';
import { setUsers } from '../redux/usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import '../styling/Login.scss';

const Login = ({ navigate }) => {

  
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(response => response.json())
      .then(data => dispatch(setUsers(data.users)))
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
    <div className="login-page-container">
    <h1 className="login-page-welcome">Log in</h1>
    <label className="login-page-label">Email:</label>
    <input className="login-page-input" type="text" onChange={handleEmail} />
    <label className="login-page-label">Password:</label>
    <input className="login-page-input" type="password" onChange={handlePassword} />
    <button className="login-page-button" onClick={handleLogin}>Log in</button>
    {incorrect && <div className="incorrect-info-warning">Wrong username or password, please try again or sign up</div>}
    </div>
  )
}

export default Login;