import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginRegister = ({ onLoginSuccess }) => {
    const navigate = useNavigate();

    // State variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginMessage, setLoginMessage] = useState('');
    const [error, setError] = useState('');

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
        <main className="d-flex flex-nowrap full-height min-vh-100 bg-gradient">
            <div className="scrollable-container p-1">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-5">
                        <div className="card pt-5 pb-5 p-3 bg-light m-lg-">
                            <div className="card-body text-center">
                                <h2 className="fw-bold mb-2 text-lowercase">welcome! 👋</h2>
                                <p className="mb-5">we're happy to have you</p>
                                <form onSubmit={handleLogin}>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="example@gmail.com"
                                            value={email}
                                        />
                                        <label htmlFor="email">Email</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="12345"
                                            value={password}
                                        />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                </form>
                                <p className="small text-lowercase mb-4 pb-lg-1">
                                    <a href="#!">Forgot password?</a>
                                </p>
                                <button
                                    type="submit"
                                    className="btn btn-dark btn-block mb-2"
                                    style={{ width: '100%' }}
                                    onClick={handleLogin}
                                >
                                    LOG IN
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-dark btn-block"
                                    style={{ width: '100%' }}
                                >
                                    SIGN UP
                                </button>
                                {error && <div className="mt-3 alert alert-danger">{error}</div>}
                                {loginMessage && <div className="mt-3 alert alert-success">{loginMessage}</div>}
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