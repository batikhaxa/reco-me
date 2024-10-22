// src/App.js
import React from 'react';
import Sidebar from './components/Sidebar';
import Main from './components/Main';

function App() {
    return (
        <main className="d-flex flex-nowrap full-height">
            <Sidebar />
            <Main />
        </main>
    );
}

export default App;
