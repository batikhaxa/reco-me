import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
    const [username, setUsername] = useState('');
    const [displayname, setDisplayname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!username || !displayname || !email || !password) {
            setError('Please fill out all fields');
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        // Send the registration data to the backend
        axios.post('http://localhost:5000/api/registration', { username, displayname, email, password })
            .then((response) => {
                setLoading(false);
                setSuccess('Registration successful!');
                setUsername('');
                setDisplayname('');
                setEmail('');
                setPassword('');
            })
            .catch((error) => {
                setLoading(false);
                setError(error.response?.data?.error || 'An error occurred');
            });
    };

    return (
        <div className="container" style={{ paddingTop: '3em' }}>
            <div id="register-card" className="card shadow-none p-1" style={{ marginLeft: '100px', width: '500px' }}>
                <div className="card-body">
                    <h2>Register</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="displayname"
                                placeholder="Display Name"
                                value={displayname}
                                onChange={(e) => setDisplayname(e.target.value)}
                                required
                            />
                            <label htmlFor="displayname">Display Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;
