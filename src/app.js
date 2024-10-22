import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css'; 
import Sidebar from './sidebar';

const App = () => {
    return (
        <div className="app">
            <Sidebar />  {/* Use Sidebar component */}
            <main>
                {/* Main content goes here */}
                <h1>Main Content Area</h1>
            </main>
        </div>
    );
};

export default App;
