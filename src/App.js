import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './components/sidebar';
import Main from './components/main';
import Recommend from './components/recommend';
import Search from './components/search';
import LoginRegister from './components/Login';
import Cookies from 'js-cookie'; // Import js-cookie
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = (token) => {
    console.log('Login successful, token received:', token);
    Cookies.set('authToken', token, { expires: 7 }); // Store the token in a cookie with a 7-day expiration
    setIsLoggedIn(true);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('Token stored in cookies:', Cookies.get('authToken'));
  };

  useEffect(() => {
    const verifyToken = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        try {
            console.log('Verifying token at:', 'http://localhost:5000/api/verify-token');
            const response = await axios.post('http://localhost:5000/api/verify-token', { token });
            if (response.data.valid) {
                setIsLoggedIn(true);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } else {
                console.warn('Token expired. Logging out...');
                setIsLoggedIn(false);
                localStorage.removeItem('authToken');
            }
        } catch (err) {
            console.error('Token verification failed:', err.message);
            setIsLoggedIn(false);
            localStorage.removeItem('authToken');
        }
    } else {
        setIsLoggedIn(false);
    }
};


    verifyToken();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public routes - only accessible when not logged in */}
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<LoginRegister onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<LoginRegister />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          // Protected routes - only accessible when logged in
          <Route
            path="*"
            element={
              <main className="d-flex flex-nowrap full-height min-vh-100">
                <Sidebar />
                <div className="content flex-grow-1 overflow-auto">
                  <Routes>
                    <Route path="/home" element={<Main />} />
                    <Route path="/recommend" element={<Recommend />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                  </Routes>
                </div>
              </main>
            }
          />
        )}
      </Routes>
    </Router>
  );
};

export default App;
