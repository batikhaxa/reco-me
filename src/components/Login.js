import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginRegister = ({ onLoginSuccess }) => {
    const [isSigningUp, setIsSigningUp] = useState(false);

    // Login state
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');

    // Registration state
    const [username, setUsername] = useState('');
    const [displayname, setDisplayname] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Reset messages when switching between sign-in and sign-up
    useEffect(() => {
        setLoginMessage('');
        setError('');
        setSuccess('');
    }, [isSigningUp]);
    const verifyToken = async (token) => {
        try {
            const response = await axios.post('http://localhost:5000/api/verify-token', { token });
            if (response.data.valid) {
                console.log('Token is valid');
            } else {
                console.log('Token is invalid');
                setError('Session expired. Please log in again.');
                localStorage.removeItem('token');
                navigate('/login'); // Redirect to login page
            }
        } catch (err) {
            console.error('Error verifying token:', err);
            setError('Error verifying session. Please log in again.');
            localStorage.removeItem('token');
            navigate('/login');
        }
    };
    const handleLogin = (e) => {
        e.preventDefault();
        
        setLoginMessage('');
        setError('');
        
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }
    
        setLoading(true);
    
        axios.post('http://localhost:5000/api/login', { email, password })
            .then((response) => {
                console.log('Login successful, response:', response);
                setLoading(false);
                const token = response.data.token;
    
                if (token) {
                    setLoginMessage(`Login successful! Welcome, ${response.data.user.displayname}.`);
                    onLoginSuccess(token);  // Pass token to parent component
                    setEmail('');
                    setPassword('');
                    navigate('/home');
                } else {
                    setError('Token missing in response');
                }
            })
            .catch((error) => {
                setLoading(false);
                setError(error.response?.data?.error || 'Invalid email or password');
            });
    };
    

    const handleRegister = (e) => {
        e.preventDefault();

        if (!username || !displayname || !regEmail || !regPassword) {
            setError('Please fill out all fields');
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(regEmail)) {
            setError('Please enter a valid email address');
            return;
        }

        if (regPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        axios.post('http://localhost:5000/api/registration', {
            username,
            displayname,
            email: regEmail,
            password: regPassword,
        })
            .then(() => {
                setLoading(false);
                setSuccess('Registration successful!');
                setUsername('');
                setDisplayname('');
                setRegEmail('');
                setRegPassword('');
            })
            .catch((error) => {
                setLoading(false);
                setError(error.response?.data?.error || 'An error occurred');
            });
    };

    return (
        <div className="container mx-0 mx-sm-5 mx-lg-5 mt-5">
            <div className={`mt-5 cont border ${isSigningUp ? 's--signup' : ''}`} style={{ backgroundColor: "#FCEEF2" }}>
                <div className='container mt-5 d-flex align-items-center'>
                    <div className="form sign-in" style={{ marginLeft: "100px" }}>
                        <div className='col-7'>
                            <h2 className="fs-2 p-3 mb-3">👋 Welcome back!</h2>
                            <form onSubmit={handleLogin}>
                                <label style={{ marginBottom: "2rem" }}>
                                    <input
                                        style={{
                                            width: "300px",
                                            background: "transparent",
                                            border: "none",
                                            borderBottom: "1px solid white"
                                        }}
                                        type="email"
                                        value={email}
                                        placeholder='email'
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </label>
                                <label style={{ marginBottom: "2rem" }}>
                                    <input
                                        style={{
                                            width: "300px",
                                            background: "transparent",
                                            border: "none",
                                            borderBottom: "1px solid white"
                                        }}
                                        type="password"
                                        value={password}
                                        placeholder='password'
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </label>
                                <p className="forgot-pass">Forgot password?</p>
                                <button type="submit" disabled={loading}
                                    style={{
                                        backgroundColor: "pink",
                                        border: "2px #000",
                                        borderRadius: "10px",
                                        boxShadow: "none",
                                        padding: "3px",
                                        width: "100px",
                                        textAlign: "center",
                                        fontSize: "1rem",
                                        margin: "auto 120px"
                                    }}>
                                    {loading ? 'Logging in...' : 'SIGN IN'}
                                </button>
                            </form>
                            {error && <div className="alert alert-danger">{error}</div>}
                            {loginMessage && <div className="alert alert-success">{loginMessage}</div>}
                        </div>
                    </div>
                </div>

                <div className="sub-cont">
                    <div className="img bg-gradient">
                        <div className="img__text m--up">
                            <a
                                href="/"
                                className="d-flex align-items-center link-body-emphasis text-decoration-none"
                            >
                                <img
                                    src="/img/icon.png"
                                    className="bi pe-none me-2"
                                    width="60"
                                    height="60"
                                    alt="icon"
                                />
                                <span id="sidebar-title" className="fs-2">reco.me</span>
                            </a>
                        </div>
                        <div className="img__text m--in">
                            <h2>One of us?</h2>
                            <p>If you already have an account, just sign in. We've missed you!</p>
                        </div>
                        <div
                            className="img__btn"
                            onClick={() => setIsSigningUp(!isSigningUp)}
                        >
                            <span className="m--up">Sign Up</span>
                            <span className="m--in">Sign In</span>
                        </div>
                    </div>

                    <div className="form sign-up">
                        <h2>Time to feel like home,</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}
                        <form onSubmit={handleRegister}>
                            <label>
                                <span>Username</span>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                <span>Display Name</span>
                                <input
                                    type="text"
                                    value={displayname}
                                    onChange={(e) => setDisplayname(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                <span>Email</span>
                                <input
                                    type="email"
                                    value={regEmail}
                                    onChange={(e) => setRegEmail(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                <span>Password</span>
                                <input
                                    type="password"
                                    value={regPassword}
                                    onChange={(e) => setRegPassword(e.target.value)}
                                    required
                                />
                            </label>
                            <button type="submit" className="submit" disabled={loading}>
                                {loading ? 'Registering...' : 'Sign Up'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;
