import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Main from './components/main';
import Recommend from './components/recommend';
import Search from './components/search';
import LoginRegister from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update login state
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<LoginRegister onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<LoginRegister />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}

        {/* Protected routes */}
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
