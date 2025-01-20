import React, { useState, useEffect } from 'react';

const Settings = () => {
    const [displayname, setDisplayname] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState(''); // For displaying current or uploaded profile image
    const [onlineProfileImageLink, setOnlineProfileImageLink] = useState(''); // For online link
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Fetch current user data from the backend
        setLoading(true);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/sidebar`, {
            method: 'POST',
            credentials: 'include', // Send cookies with the request
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                const { displayname, profile_picture } = data;
                setDisplayname(displayname);
                setProfileImageUrl(profile_picture);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setError('Failed to fetch user data');
            });
    }, []);

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        if (displayname === '' && onlineProfileImageLink === '') {
            setError('No changes detected for profile update');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');
        const formData = new FormData();
        if (displayname) formData.append('displayname', displayname);
        if (onlineProfileImageLink) formData.append('onlineProfileImageLink', onlineProfileImageLink);

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile`, {
            method: 'PUT',
            body: formData,
            credentials: 'include',
        })
            .then(async (response) => {
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'An error occurred');
                }
                setLoading(false);
                setSuccess('Profile updated successfully!');
                setOnlineProfileImageLink('');
            })
            .catch((error) => {
                setLoading(false);
                setError(error.message || 'An error occurred');
            });
    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        if (!oldPassword || !password || !confirmPassword) {
            setError('All password fields are required');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ oldPassword, password }),
            credentials: 'include',
        })
            .then(async (response) => {
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'An error occurred');
                }
                setLoading(false);
                setSuccess('Password updated successfully!');
                setOldPassword('');
                setPassword('');
                setConfirmPassword('');
            })
            .catch((error) => {
                setLoading(false);
                setError(error.message || 'An error occurred');
            });
    };

    const handleOnlineImageLinkChange = (e) => {
        const link = e.target.value;
        setOnlineProfileImageLink(link); // Set online link
        setProfileImageUrl(link); // Preview online image
    };

    return (
        <div className="scrollable-container pt-4 pt-md-3 pt-lg-3" data-bs-offset="0">
            <div className="container mx-0 mx-sm-5 mx-lg-5 mt-5">
                <div className="m-0">
                    <div className="col-12 col-md-9 col-lg-12">
                        <div
                            id="recommend-card"
                            className="card shadow-none p-1 mb-5"
                            style={{
                                width: '100%',
                            }}
                        >
                            <div className="card-body">
                                <label className="d-inline-flex mb-1">
                                    <i className="bi bi-gear fs-5 mt-1"></i>
                                    <p className="text-lowercase fs-4">settings</p>
                                </label>
                                <br></br>
                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && <div className="alert alert-success">{success}</div>}
                                <b><label className="d-inline-flex mb-1">
                                    <i className="bi bi-person-circle"></i>
                                    <p className="text-lowercase">change profile</p>
                                </label></b>
                                <form onSubmit={handleUpdateProfile}>
                                    {/* Profile Image */}
                                    <div className="text-center mb-3">
                                        <img
                                            src={profileImageUrl || 'https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg'}
                                            alt="Profile Picture"
                                            className="rounded-circle"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <b><p className="text-center fw-light fs-4">{displayname}</p></b>

                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Image URL"
                                            value={onlineProfileImageLink}
                                            onChange={handleOnlineImageLinkChange}
                                        />
                                        <label htmlFor="displayname">Image URL</label>
                                    </div>

                                    {/* Display Name */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="displayname"
                                            placeholder="Display Name"
                                            value={displayname}
                                            onChange={(e) => setDisplayname(e.target.value)}
                                        />
                                        <label htmlFor="displayname">Display Name</label>
                                    </div>

                                    <div class="d-flex justify-content-end">
                                        <button type="submit" className="set-btn" disabled={loading}>
                                            {loading ? 'Updating...' : 'Update Password'}
                                        </button>
                                    </div>
                                </form>
                                <form onSubmit={handleUpdatePassword}>
                                    <b>
                                        <label className="d-inline-flex mb-1">
                                            <i className="bi bi-shield-lock"></i>
                                            <p className="text-lowercase">Change Password</p>
                                        </label>
                                    </b>
                                    {/* Old Password */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="oldPassword"
                                            placeholder="Current Password"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                        <label htmlFor="oldPassword">Current Password</label>
                                    </div>

                                    {/* New Password */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="New Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <label htmlFor="password">New Password</label>
                                    </div>

                                    {/* Confirm New Password */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirmPassword"
                                            placeholder="Confirm New Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <label htmlFor="confirmPassword">Confirm New Password</label>
                                    </div>
                                    <div class="d-flex justify-content-end">
                                        <button type="submit" className="set-btn" disabled={loading}>
                                            {loading ? 'Updating...' : 'Update Password'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
