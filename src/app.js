// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css'; // You can create a CSS file for additional styles

const App = () => {
    return (
        <main className="d-flex flex-nowrap full-height">
            {/* Sidebar */}
            <aside className="sidebar">
                {/* You can add sidebar content here */}
            </aside>

            {/* Main Content */}
            <div className="flex-fill p-3" style={{ backgroundColor: 'aqua' }}>
                <div className="row">
                    <div className="col border border-primary">
                        Friend Recommendation Container
                    </div>
                    <div className="col border border-primary">
                        Secondary Friend Recommendation
                    </div>
                </div>
            </div>
        </main>
    );
};

export default App;
