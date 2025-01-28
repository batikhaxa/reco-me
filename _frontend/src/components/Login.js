import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginRegister = ({ onLoginSuccess }) => {
    const navigate = useNavigate();

    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    // login & registration
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [username, setUsername] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');

    const [loginMessage, setLoginMessage] = useState('');
    const [error, setError] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();

        if (!username || !regEmail || !regPassword) {
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
        const displayname = username;
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/registration`, {
                username,
                displayname,
                email: regEmail,
                password: regPassword,
            })
            .catch((error) => {
                setError(error.response?.data?.error || 'An error occurred');
            });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setLoginMessage('');
        setError('');
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, { email, password }, { withCredentials: true })
            .then((response) => {
                setLoginMessage(`Login successful! Welcome, ${response.data.user.displayname}.`);
                setEmail('');
                setPassword('');
                onLoginSuccess();
                navigate('/home');
            })
            .catch((error) => {
                setError(error.response?.data?.error || 'Invalid email or password');
            });
    };
    return (
        <main className="d-flex flex-nowrap full-height min-vh-100 bg-gradient-anim">
            <div className="scrollable-container p-1">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-5">
                        <div className={`full-height flip ${isFlipped ? "flipped" : ""}`}>
                            <div className="flip-front">
                                <div className="card pt-5 pb-5 p-3 bg-light">
                                    <div className="card-body text-center">
                                        <h2 className="fw-bold mb-2 text-lowercase">welcome back! 👋</h2>
                                        <p className="mb-5">we're happy to have you</p>
                                        <form>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="example@gmail.com"
                                                    id="email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    value={email}
                                                />
                                                <label>Email</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="12345"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    value={password}
                                                />
                                                <label>Password</label>
                                            </div>
                                        </form>
                                        <button
                                            type="submit"
                                            className="btn btn-dark btn-block mb-2"
                                            style={{ width: "100%" }}
                                            onClick={handleLogin}
                                        >
                                            LOG IN
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark btn-block"
                                            style={{ width: "100%" }}
                                            onClick={handleFlip}
                                        >
                                            SIGN UP
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flip-back">
                                <div className="card pt-5 pb-5 p-3 bg-light">
                                    <div className="card-body text-center">
                                        <h2 className="fw-bold mb-2 text-lowercase">new here? 💗</h2>
                                        <p className="mb-5">sign up below!</p>
                                        <form>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    className="form-control"
                                                    placeholder="bob"
                                                />
                                                <label>Username</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="email"
                                                    value={regEmail}
                                                    onChange={(e) => setRegEmail(e.target.value)}
                                                    className="form-control"
                                                    placeholder="example@gmail.com"
                                                />
                                                <label>Email</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Create Password"
                                                    value={regPassword}
                                                    onChange={(e) => setRegPassword(e.target.value)}
                                                />
                                                <label>Password</label>
                                            </div>
                                        </form>
                                        <button
                                            type="submit"
                                            className="btn btn-dark btn-block mb-2"
                                            style={{ width: "100%" }}
                                            onClick={handleRegister}
                                        >
                                            SIGN UP
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark btn-block"
                                            style={{ width: "100%" }}
                                            onClick={handleFlip}
                                        >
                                            LOG IN
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ms-3 col-3 col-md-7 col-lg-4 col-xl-4 d-none d-md-none d-lg-block">
                        <div className="d-flex justify-content-center pt-3">
                            <a
                                href="/login"
                                className="d-flex align-items-center text-decoration-none"
                            >
                                <img
                                    src="/img/icon.png"
                                    className="bi pe-none me-2"
                                    width="125"
                                    height="125"
                                    alt="icon"
                                />
                                <span id="sidebar-title" className="fs-1 me-4">reco.me</span>
                            </a>
                        </div>

                        <div className="text-justify text-white mt-4 font-monospace mb-5">
                            <p>
                                <b>reco.me</b> helps you connect with friends over shared media passions, discover new favorites, and expand your cultural circle while making new connections. 💬
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LoginRegister;