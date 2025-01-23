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
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, { email, password }, { withCredentials: true })
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
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/registration`, {
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
        <>


            <div className="container d-none d-lg-block" style={{ loginWrapper }}>
                <div className="row justify-content-center  mx-auto mt-3" >
                    <div className={`mt-5 cont ${isSigningUp ? 's--signup' : ''}`} style={{ backgroundColor: "#FFEEF2" }}>


                        <div className=" col-12 col-md-8 offset-md-1 mt-5">
                            {/* Sign-in Form */}


                            <div className="form-floating sign-in d-flex justify-content-center align-items-center mx-auto">
                                {/* for the card's content */}
                                <div className="col-10 col-lg-10 col-md-8 col-sm-8">

                                    <h2 className="fs-2 p-2 mb-3 text-lowercase" style={{ fontFamily: "monospace" }}>👋 Welcome back!</h2>
                                    <form onSubmit={handleLogin} style={{ marginLeft: "2rem" }}>
                                        <label>
                                            <input
                                                type="email"
                                                className=" form-control mb-3"
                                                id="floatingInput"
                                                value={email}
                                                placeholder="email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                style={inputStyle}
                                                required
                                            />
                                            <label for="floatingInput"></label>
                                        </label>
                                        <label>
                                            <input
                                                type="password"
                                                className="form-control mb-1"
                                                id="floatingPassword"
                                                value={password}
                                                placeholder="password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                style={inputStyle}
                                                required
                                            />

                                            <label for="floatingPassword"></label>
                                            <p className="forgot-pass text-lowercase  mb-3" style={forgotPassStyle}>Forgot password?</p>



                                        </label>
                                        <button type="submit" disabled={loading} style={buttonStyle}>
                                            {loading ? 'Logging in...' : 'SIGN IN'}
                                        </button>
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        {loginMessage && <div className="alert alert-success">{loginMessage}</div>}
                                        <button className="mt-2  d-block d-md-none set-btn" type="submit" onClick={() => setIsSigningUp(!isSigningUp)} >SIGN UP</button>

                                    </form>

                                </div>



                            </div>


                        </div>



                        {/* Sign-up Form */}
                        <div className="sub-cont img-fluid" style={{ backgroundColor: "#FFEEF2" }}>
                            <div className="row">
                                <div className="col-md-8 offset-md-1">
                                    <div className="img bg-gradient img-fluid  d-none d-lg-block">
                                        <div className="img__text m--up">
                                            <a href="/" className="d-flex align-items-center link-body-emphasis text-decoration-none">
                                                <img src="/img/icon.png" alt="icon" width="60" height="60" className="ms-2 img-fluid" />
                                                <span id="sidebar-title" className="fs-2">reco.me</span>
                                            </a>
                                            <p className="mt-4 text-justify text-lowercase" style={imgTextStyle}>Don't have an account? Become one of us by signing up below!</p>
                                        </div>
                                        {/* sign in img side */}
                                        <div className="img__text m--in" >
                                            <a href="/" className="d-flex align-items-center link-body-emphasis text-decoration-none">
                                                <img src="/img/icon.png" alt="icon" width="60" height="60" className="ms-2" />
                                                <span id="sidebar-title" className="fs-2">reco.me</span>
                                            </a>
                                            <p className="mt-4  text-justify text-lowercase" style={imgTextStyle}>Already have an account? Sign in with the button below.</p>
                                        </div>
                                        <div className="img__btn mt-4" onClick={() => setIsSigningUp(!isSigningUp)}>
                                            <span className="m--up" >Sign Up</span>
                                            <span className="m--in" >Sign In</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="container mx-auto mt-3 d-flex justify-content-center align-items-center " style={signUpStyle}>
                                <div className="mt-4 form sign-up">
                                    <div className="row justify-content-center">
                                        <div className="col-12">
                                            <p className="fs-2 text-lowercase text-center mb-4" style={forgotPassStyle}>
                                                new here? 🤗
                                            </p>
                                            <form onSubmit={handleRegister} className="text-center">
                                                <div className="mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={username}
                                                        placeholder="username"
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        style={inputStyle}
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={displayname}
                                                        placeholder="display name"
                                                        onChange={(e) => setDisplayname(e.target.value)}
                                                        style={inputStyle}
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        value={regEmail}
                                                        placeholder="email"
                                                        onChange={(e) => setRegEmail(e.target.value)}
                                                        style={inputStyle}
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        value={regPassword}
                                                        placeholder="password"
                                                        onChange={(e) => setRegPassword(e.target.value)}
                                                        style={inputStyle}
                                                        required
                                                    />
                                                </div>
                                                <div className='row'>
                                                    <button type="submit" disabled={loading} style={buttonStyle} className="set-btn mt-3">
                                                        {loading ? 'Registering...' : 'SIGN UP'}
                                                    </button>
                                                    <button className="mt-2  d-block d-md-none" type="submit" onClick={() => setIsSigningUp(!isSigningUp)} style={buttonStyle} >SIGN IN</button>
                                                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                                                    {success && <div className="alert alert-success mt-3">{success}</div>}
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* small container */}
            <div className="container mx-sm-auto mx-md-auto d-block d-lg-none" style={{ loginWrapper }}>
                <div className="row justify-content-center mx-sm-3 mx-md-3 mt-3" >
                    <div className={`mt-5 cont ${isSigningUp ? 's--signup' : ''}`} style={{ backgroundColor: "#FFEEF2" }}>


                        <div className=" col-12 mx-3 mt-5">
                            {/* Sign-in Form */}

                            <div className='row justify-content-center offset-md-1'>
                                <div className="form-floating sign-in d-flex justify-content-center align-items-center">
                                    {/* for the card's content */}
                                    <div className="col-12 col-md-10 col-sm-8">

                                        <h2 className="fs-2 p-1 mb-3 w-100 text-lowercase" style={{ fontFamily: "monospace" }}>👋 Welcome back!</h2>
                                        <form onSubmit={handleLogin} style={{ marginLeft: "2rem" }}>
                                            <label>
                                                <input
                                                    type="email"
                                                    className=" form-control mb-3"
                                                    id="floatingInput"
                                                    value={email}
                                                    placeholder="email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    style={inputStyle}
                                                    required
                                                />
                                                <label for="floatingInput"></label>
                                            </label>
                                            <label>
                                                <input
                                                    type="password"
                                                    className="form-control mb-1"
                                                    id="floatingPassword"
                                                    value={password}
                                                    placeholder="password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    style={inputStyle}
                                                    required
                                                />


                                                <label for="floatingPassword"></label>
                                                <p className="forgot-pass text-lowercase mb-3" style={forgotPassStyle}>Forgot password?</p>

                                            </label>


                                            <button type="submit" disabled={loading} style={buttonStyle}>
                                                {loading ? 'Logging in...' : 'SIGN IN'}
                                            </button>
                                            {error && <div className="alert alert-danger">{error}</div>}
                                            {loginMessage && <div className="alert alert-success">{loginMessage}</div>}

                                            <button className="mt-2  d-block d-lg-none" type="submit" onClick={() => setIsSigningUp(!isSigningUp)} style={buttonStyle} >SIGN UP</button>

                                        </form>
                                    </div>
                                </div>



                            </div>


                        </div>
                        <div className="sub-cont img-fluid " style={{ backgroundColor: "#FFEEF2" }}>



                            <div className="container  mt-3 d-flex justify-content-center align-items-center " style={signUpStyle}>
                                <div className="mt-4 form sign-up">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-12 offset-md-3  ">
                                            <p className="fs-2 text-lowercase text-center mb-4" style={forgotPassStyle}>
                                                new here? 🤗
                                            </p>
                                            <form onSubmit={handleRegister} className="text-center">
                                                <div className="mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={username}
                                                        placeholder="username"
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        style={inputStyle}
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={displayname}
                                                        placeholder="display name"
                                                        onChange={(e) => setDisplayname(e.target.value)}
                                                        style={inputStyle}
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        value={regEmail}
                                                        placeholder="email"
                                                        onChange={(e) => setRegEmail(e.target.value)}
                                                        style={inputStyle}
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        value={regPassword}
                                                        placeholder="password"
                                                        onChange={(e) => setRegPassword(e.target.value)}
                                                        style={inputStyle}
                                                        required
                                                    />
                                                </div>
                                                <div className='row'>
                                                    <button type="submit" disabled={loading} style={buttonStyle} className="set-btn mt-3">
                                                        {loading ? 'Registering...' : 'SIGN UP'}
                                                    </button>
                                                    <button className="mt-2  d-block d-lg-none" type="submit" onClick={() => setIsSigningUp(!isSigningUp)} style={buttonStyle} >SIGN IN</button>
                                                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                                                    {success && <div className="alert alert-success mt-3">{success}</div>}
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>














        </>

    );
};






// Styles
const inputStyle = {

    background: "transparent",
    border: "none",
    borderBottom: "1px solid white",
    minWidth: "250px",
    marginBottom: "5%",
    hover: "none"
};

const buttonStyle = {
    backgroundColor: "#ffcad1",
    border: "2px #000",
    borderRadius: "20px",
    boxShadow: "none",
    padding: "2.5%",
    maxWidth: "110px",
    textAlign: "center",
    fontSize: "1rem",
    fontFamily: "monospace",
    margin: "0 23%"


}

const forgotPassStyle = {

    fontFamily: "monospace",
    color: "black",


};

const imgTextStyle = {
    fontFamily: "monospace",
    color: "white",
}

const loginWrapper = {
    display: "flex",
    flexDirection: "column",
    justifycontent: "center",
    alignItems: "center",     // Full viewport height

}
const signUpStyle = {
    marginLeft: window.innerWidth < 992.00 ? '-120px' : '50px',



};




export default LoginRegister;