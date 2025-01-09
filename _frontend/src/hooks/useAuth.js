import { useState, useEffect } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

    useEffect(() => {
        const validateSession = async () => {
            try {
                const response = await fetch(`${ process.env.REACT_APP_BACKEND_URL }/api/auth/validate`, {
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
