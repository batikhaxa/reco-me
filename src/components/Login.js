import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginRegister = ({ onLoginSuccess }) => {
    const [isSigningUp, setIsSigningUp] = useState(false);
    const navigate = useNavigate();

    // State variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
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

    const handleLogin = (e) => {
        e.preventDefault();
        setLoginMessage('');
        setError('');

        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setLoading(true);
        axios
            .post('http://localhost:5000/api/login', { email, password })
            .then((response) => {
                setLoading(false);
                setLoginMessage(`Login successful! Welcome, ${response.data.user.displayname}.`);
                setEmail('');
                setPassword('');
                onLoginSuccess();
                navigate('/home');
            })
            .catch((error) => {
                setLoading(false);
                setError(error.response?.data?.error || 'Invalid email or password');
            });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

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
        axios
            .post('http://localhost:5000/api/registration', {
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
  
           
            <div className="container" style={{loginWrapper}}>
                    <div className="container mx-0 mx-sm-3 mx-lg-3 mt-3">
                        <div className={`mt-5 cont ${isSigningUp ? 's--signup' : ''}`} style={{ backgroundColor: "#FFEEF2" }}>
                            
                            
                            <div className=" mt-5 d-flex align-items-center">
                                {/* Sign-in Form */}
                                <div className="form mx-5 sign-in d-flex justify-content-center align-items-center">
                                    {/* for the card's content */}
                                    <div className="col-10 col-lg-10 col-md-6"> 
                                        <h2 className="fs-2 p-3 mb-3 text-lowercase" style={{ fontFamily: "monospace" }}>👋 Welcome back!</h2>
                                        <form onSubmit={handleLogin} style={{marginLeft:"2rem"}}>
                                            <label>
                                                <input
                                                    type="email"
                                                    className="mb-4"
                                                    value={email}
                                                    placeholder="email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    style={inputStyle}
                                                    required
                                                />
                                            </label>
                                            <label>
                                                <input
                                                    type="password"
                                                    className="mb-4"
                                                    value={password}
                                                    placeholder="password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    style={inputStyle}
                                                    required
                                                />
                                                <p className="forgot-pass text-lowercase" style={forgotPassStyle}>Forgot password?</p>
                                            </label>
                                            <button type="submit" disabled={loading} style={buttonStyle}>
                                                {loading ? 'Logging in...' : 'SIGN IN'}
                                            </button>
                                        </form>
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        {loginMessage && <div className="alert alert-success">{loginMessage}</div>}
                                    </div>
                                </div>
                            </div>

                            {/* Sign-up Form */}
                            <div className="sub-cont" style={{ backgroundColor: "#FFEEF2" }}>
                                <div className="img bg-gradient">
                                    <div className="img__text m--up">
                                        <a href="/" className="d-flex align-items-center link-body-emphasis text-decoration-none">
                                            <img src="/img/icon.png" alt="icon" width="60" height="60" className="ms-2"/>
                                            <span id="sidebar-title" className="fs-2">reco.me</span>
                                        </a>
                                        <p className="mt-4 text-justify text-lowercase">Don't have an account? Become one of us by signing up below!</p>
                                    </div>
                                    <div className="img__text m--in">
                                        <a href="/" className="d-flex align-items-center link-body-emphasis text-decoration-none">
                                            <img src="/img/icon.png" alt="icon" width="60" height="60" className="ms-2" />
                                            <span id="sidebar-title" className="fs-2">reco.me</span>
                                        </a>
                                        <p className="mt-4 text-justify text-lowercase">Already have an account? Sign in with the button below.</p>
                                    </div>
                                    <div className="img__btn" onClick={() => setIsSigningUp(!isSigningUp)}>
                                        <span className="m--up">Sign Up</span>
                                        <span className="m--in">Sign In</span>
                                    </div>
                                </div>

                                <div className="container mt-3 d-flex align-items-center">
                                    <div className="mt-4 mx-5 form sign-up d-flex justify-content-center align-items-center">
                                    <div className='row mx-5'>
                                        <div className="col-12">
                                            <p className="fs-2 text-lowercase mx-3 mb-4" style={{ fontFamily: "monospace" }}>new here? 🤗</p>
                                            <form onSubmit={handleRegister}>
                                                <label>
                                                    <input
                                                        type="text"
                                                        className="mb-4"
                                                        value={username}
                                                        placeholder="username"
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        style={inputStyle}
                                                        required
                                                    />
                                                </label>
                                                <label>
                                                    <input
                                                        type="text"
                                                        className="mb-4"
                                                        value={displayname}
                                                        placeholder="display name"
                                                        onChange={(e) => setDisplayname(e.target.value)}
                                                        style={inputStyle}
                                                        required
                                                    />
                                                </label>
                                                <label>
                                                    <input
                                                        type="email"
                                                        className="mb-4"
                                                        value={regEmail}
                                                        placeholder="email"
                                                        onChange={(e) => setRegEmail(e.target.value)}
                                                        style={inputStyle}
                                                        required
                                                    />
                                                </label>
                                                <label>
                                                    <input
                                                        type="password"
                                                        className="mb-2"
                                                        value={regPassword}
                                                        placeholder="password"
                                                        onChange={(e) => setRegPassword(e.target.value)}
                                                        style={inputStyle}
                                                        required
                                                    />
                                                </label>
                                                {error && <div className="alert alert-danger">{error}</div>}
                                                {success && <div className="alert alert-success">{success}</div>}
                                                <button type="submit" disabled={loading} style={buttonStyle} className="btn btn-primary mt-3 mx-5">
                                                    {loading ? 'Registering...' : 'SIGN UP'}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        
 

    );
};

// Styles
const inputStyle = {
  
    background: "transparent",
    border: "none",
    borderBottom: "1px solid white",
    minWidth:"300px",
    marginBottom:"20%"
};

const buttonStyle = {
    backgroundColor: "#ffcad1",
    border: "2px #000",
    borderRadius: "20px",
    boxShadow: "none",
    padding: "2%",
    maxWidth: "100px",
    textAlign: "center",
    fontSize: "1rem",
    fontFamily: "monospace",
    margin: "0 20%",
}

const forgotPassStyle = {
    marginBottom: "2rem",
    fontFamily: "monospace",
    color: "black",
  
};

const loginWrapper ={
    display: "flex",
    flexDirection: "column",
    justifycontent:"center",
    alignItems: "center",
    minHeight: "100vh",
}
export default LoginRegister;
