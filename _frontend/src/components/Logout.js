import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = ({ onLogout }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await axios.post('http://localhost:5000/api/logout', {}, {
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

    return <div>Logging out...</div>;
};

export default Logout;
