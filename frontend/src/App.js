import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';


import './index.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';



function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <Router>
        <div className="contain-nav">
          <Navbar />
        </div>
        <div className="pages">
          <Routes>
            <Route path="/home" element={user ? <Home /> : <Navigate to='/login' />} />
            <Route path="/login" element={user ? <Navigate to='/home' /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to='/home' /> : <SignUp />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
