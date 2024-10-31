import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Main from './components/main';
import Recommend from './components/recommend';
import Search from './components/search';

const App = () => {
  return (
    <Router>
      <main className="d-flex flex-nowrap full-height">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Main />} />
            <Route path="/recommend" element={<Recommend />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
};

export default App;
