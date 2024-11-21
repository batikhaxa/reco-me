import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Main from './components/main';
import Recommend from './components/recommend';
import Search from './components/search';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <Router>
      <div className="d-flex flex-nowrap full-height">
        {/* Sidebar for larger screens */}
        <div className={`d-flex flex-nowrap full-height ${isSidebarVisible ? 'show' : ''}`}>
          <Sidebar />
        </div>

        {/* Sticky Navbar for smaller screens */}
        <div className="sticky-sm-top d-md-none bg-light shadow">
          <button
            className="btn btn-primary m-2"
            onClick={toggleSidebar}
          >
            Menu
          </button>
        </div>

        {/* Sidebar overlay for small screens */}
        {isSidebarVisible && (
          <div className="position-fixed top-0 start-0 h-100 bg-light z-3">
            <Sidebar />
            <button
              className="btn btn-danger m-2 position-absolute top-0 end-0"
              onClick={toggleSidebar}
            >
              Close
            </button>
          </div>
        )}

        {/* Main Content Area */}
        <div className="content flex-grow-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Main />} />
            <Route path="/recommend" element={<Recommend />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
