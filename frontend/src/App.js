import logo from './logo.svg';
import Landing from './components/Landing';
import Signup from './components/Signup';
import Login from './components/Login';
import MyHome from './components/MyHome';
import Notifications from './components/Notifications/Notifications';
import Profile from './components/Profile/Profile';
import Messages from './components/Messages/Messages';
import { useNavigate, Routes, Route } from 'react-router-dom';
import './App.scss';

function App() {

  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Landing navigate={navigate} />} />
      <Route path="/signup" element={<Signup navigate={navigate} />} />
      <Route path="/login" element={<Login navigate={navigate} />} />
      <Route path="/myhome" element={<MyHome navigate={navigate} />}/>
      <Route path="/notifications" element={<Notifications navigate={navigate} />}/>
      <Route path="/profile" element={<Profile navigate={navigate} />}/>
      <Route path="/messages" element={<Messages navigate={navigate} />}/>
    </Routes>
  );
}

export default App;
