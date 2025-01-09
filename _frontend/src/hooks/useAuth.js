import { useState, useEffect } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

    useEffect(() => {
        const validateSession = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/validate', {
                    method: 'GET',
                    credentials: 'include', // Include cookies
                });
                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Error validating session:', error);
                setIsAuthenticated(false);
            }
        };
        validateSession();
    }, []);

    return isAuthenticated;
};

export default useAuth;
