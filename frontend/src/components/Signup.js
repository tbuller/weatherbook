import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers, addUser } from '../redux/usersSlice';
import '../styling/Signup.scss';

const Signup = ({ navigate }) => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailDuplicate, setEmailDuplicate] = useState(false);
  const [usernameDuplicate, setUsernameDuplicate] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(response => response.json())
      .then(data => dispatch(setUsers(data.users)))
  }, [])

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
          dispatch(addUser(data.user));
          // navigate("/login");
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
    <div className="sign-up-page-container">
    <h1 className="signup-welcome">Sign up</h1>
    <label className="signup-page-label">Email:</label>
    <input className="signup-page-input" type="text" onChange={handleEmail} />
    <label className="signup-page-label">Password:</label>
    <input className="signup-page-input" type="password" onChange={handlePassword} />
    <label className="signup-page-label">Username:</label>
    <input className="signup-page-input" type="text" onChange={handleUsername} />
    <button className="signup-page-button" onClick={createUser}>Sign up</button>
    {emailDuplicate && <div className="duplicate-email-warning">email already in use, please log in to continue</div>}
    {usernameDuplicate && <div className="duplicate-username-warning">username already is use, please choose another username or log in if you have already created an account</div>}
    </div>
  )
}

export default Signup;