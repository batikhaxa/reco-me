import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Main from './components/main';
import Recommend from './components/recommend';
import Search from './components/search';
import LoginRegister from './components/Login';
import Logout from './components/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get(`${ process.env.REACT_APP_BACKEND_URL }/api/auth/status`, {
        withCredentials: true,
      });
      setIsLoggedIn(response.data.loggedIn);
    } catch (error) {
      console.error('Error checking login status:', error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false); // Immediately update the login state
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<LoginRegister onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<LoginRegister />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}

        {isLoggedIn && (
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
                    <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
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
