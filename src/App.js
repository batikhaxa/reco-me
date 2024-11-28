// src/App.js
import React from 'react';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Main from './components/main';
import Recommend from './components/recommend';
import Search from './components/search';
import Registration from './components/Registration';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <Router>
      <main className="d-flex flex-nowrap full-height min-vh-100">
        <Sidebar />
        <div className="content flex-grow-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Main />} />
            <Route path="/recommend" element={<Recommend />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
};

export default App;
