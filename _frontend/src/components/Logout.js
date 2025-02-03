import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = ({ onLogout }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await axios.post(`${ process.env.REACT_APP_BACKEND_URL }/api/logout`, {}, {
                    withCredentials: true,
                });
                onLogout();
                navigate('/login');
                // console.log("gona refresh now!")
                // window.location.reload();
            } catch (error) {
                console.error('Error logging out:', error);
            }
        };
        handleLogout();
    }, [navigate, onLogout]);

    return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status"></div>
    </div>
};

export default Logout;
