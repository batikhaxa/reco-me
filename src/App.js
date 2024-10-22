import React from 'react';
import Sidebar from './components/sidebar';
import Main from './components/main';

const App = () => {
  return (
    <main className="d-flex flex-nowrap full-height">
      <Sidebar />
      <Main />
    </main>
  );
};

export default App;
