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
                console.log('Logged out successfully');
                onLogout(); 
                navigate('/login');
            } catch (error) {
                console.error('Error logging out:', error);
            }
        };
        handleLogout();
    }, [navigate, onLogout]);

    return <div className="mx-3 mx-sm-5 mx-lg-5 text-center text-muted vh-100">
        <div className="d-flex justify-content-center align-items-center vh-100">
            <p>Logging out...</p>
        </div>
    </div>;
};

export default Logout;
