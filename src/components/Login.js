import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginRegister = () => {
    const [isSigningUp, setIsSigningUp] = useState(false);

    // Login state
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
                setLoading(false);
                setLoginMessage(`Login successful! Welcome, ${response.data.user.displayname}.`);
                setEmail('');
                setPassword('');
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
        <div className="container  mx-0 mx-sm-5 mx-lg-5 mt-5">
            
            <div className={`mt-5 cont  ${isSigningUp ? 's--signup' : ''}`} style={{backgroundColor:"#FFEEF2"}}>
            <div className='container mt-5 d-flex align-items-center '> 
                <div className="form sign-in" 
                style={{marginLeft:"100px",}}>
               
                <div className='col-7'> 
                    <h2 className="fs-2 p-3 mb-3"style={{fontFamily:"monospace"}}>👋 welcome back!</h2>
                   
                                    <form onSubmit={handleLogin}>
                                        <label style={{marginBottom:"5rem"}}>
                                       
                                            <input
                                                style={{width:"300px",
                                                    background:"transparent",
                                                    border:"none",
                                                    borderBottom:"1px solid white"
                                                }}
                                                type="email"
                                                value={email}
                                                placeholder='email'
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </label>
                                        <label style={{marginBottom:"1rem"}}>
                                            <input
                                                style={{width:"300px",
                                                background:"transparent",
                                                border:"none",
                                                  borderBottom:"1px solid white"
                                                }}
                                                type="password"
                                                value={password}
                                                 placeholder='password'
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </label>
                                        <p className="forgot-pass" style={{marginBottom:"2rem" ,fontFamily:"monospace",color:"black"}}>forgot password?</p>

                                        <button type="submit"  disabled={loading} 
                                        style={{
                                            backgroundColor: "#ffcad1",
                                            border: "2px  #000", 
                                            borderRadius: "20px", 
                                            boxShadow: "none", 
                                            padding: "px", 
                                            width: "100px",
                                            textAlign: "center",
                                            fontSize: "1rem",
                                            margin:"auto 120px",
                                            fontFamily:"monospace"
                                        }}>
                                            {loading ? 'Logging in...' : 'SIGN IN'}
                                       
                                        </button>
                                    </form>
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    {loginMessage && <div className="alert alert-success">{loginMessage}</div>}
                                </div>
                        </div>
                </div>

                <div className="sub-cont" style={{backgroundColor:"#FFEEF2"}} >
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
                            <p style={{marginTop:"200px"}}>If you already have an account, just sign in. We've missed you!</p>
                        </div>

                        <div className="img__text m--in">
                       <p style={{marginTop:"70px"}}>If you already have an account, just sign in. We've missed you!</p>
                        </div>
                        <div
                            className="img__btn"
                            onClick={() => setIsSigningUp(!isSigningUp)}
                        >
                            <span className="m--up">Sign Up</span>
                            <span className="m--in">Sign In</span>
                        </div>
                    </div>

                    <div className='container mt-3 d-flex align-items-center '> 
                    <div className="form sign-up mt-5" style={{marginLeft:"100px"}}>

                        <div className='col-9'> 
                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}
                            <form onSubmit={handleRegister}>
                                <label style={{marginBottom:"3rem"}}>
                                    <input
                                        style={{width:"300px",
                                            background:"transparent",
                                            border:"none",
                                            borderBottom:"1px solid white"
                                        }}
                                        type="text"
                                        value={username}
                                        placeholder='username'
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </label>
                                <label style={{marginBottom:"3rem"}}>
                                
                                    <input
                                    style={{width:"300px",
                                        background:"transparent",
                                        border:"none",
                                        borderBottom:"1px solid white"
                                    }}
                                        type="text"
                                        value={displayname}
                                        placeholder='display name'
                                        onChange={(e) => setDisplayname(e.target.value)}
                                        required
                                    />
                                </label>
                                <label style={{marginBottom:"3rem"}}>
                                    
                                    <input
                                    style={{width:"300px",
                                        background:"transparent",
                                        border:"none",
                                        borderBottom:"1px solid white"
                                    }}
                                        type="email"
                                        value={regEmail}
                                        placeholder='email'
                                        onChange={(e) => setRegEmail(e.target.value)}
                                        required
                                    />
                                </label>
                                <label style={{marginBottom:"3rem"}}>
                                    <input
                                        style={{width:"300px",
                                            background:"transparent",
                                            border:"none",
                                            borderBottom:"1px solid white"
                                        }}
                                        type="password"
                                        value={regPassword}
                                        placeholder='password'
                                        onChange={(e) => setRegPassword(e.target.value)}
                                        required
                                    />
                                </label>
                                <button type="submit" className="submit" disabled={loading}
                                
                                style={{
                                    backgroundColor: "#ffcad1",
                                    border: "2px  #000", 
                                    borderRadius: "20px", 
                                    boxShadow: "none", 
                                    padding: "10px", 
                                    width: "100px",
                                    textAlign: "center",
                                    fontSize: "1rem",
                                    margin:"auto 120px", 
                                    fontFamily:"monospace"
                                }}>
                                    {loading ? 'Registering...' : 'SIGN UP'}
                                </button>
                            </form>
                        </div>
                    </div>
                   
                </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;
