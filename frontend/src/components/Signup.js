import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers, addUser } from '../redux/usersSlice';

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

  const showUsers = () => {
    console.log(users);
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
    {users && users.map(u => <div key={u._id}>{u.username}</div>)}
    <button onClick={showUsers}>show users</button>
    </div>
  )
}

export default Signup;