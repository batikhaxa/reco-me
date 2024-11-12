import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Logging in:', { email, password });
    };

    return (
        <div className="container" style={{ paddingTop: '3em' }}>
            <div id="login-card" className="card shadow-none p-1" style={{ marginLeft: '100px', width: '500px' }}>
                <div className="card-body">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="loginEmail"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="loginEmail">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="loginPassword"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="loginPassword">Password</label>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
