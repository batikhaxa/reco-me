import React from 'react';
import Sidebar from './Sidebar';
import Main from './Main';

const App = () => {
    return (
        <main className="d-flex flex-nowrap full-height">
            <Sidebar />
            <Main />
        </main>
    );
};

export default App;
