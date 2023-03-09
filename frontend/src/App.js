import logo from './logo.svg';
import Landing from './components/Landing';
import Signup from './components/Signup';
import Login from './components/Login';
import { useNavigate, Routes, Route } from 'react-router-dom';
import './App.scss';

function App() {

  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Landing navigate={navigate} />} />
      <Route path="/signup" element={<Signup navigate={navigate} />} />
      <Route path="/login" element={<Login navigate={navigate} />} />
    </Routes>
  );
}

export default App;
