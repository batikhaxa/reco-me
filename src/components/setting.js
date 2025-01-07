import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Setting = () => {
    const [displayname, setDisplayname] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null); // For preview
    const [profileImageUrl, setProfileImageUrl] = useState(''); // For displaying current profile image
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Fetch current user data from the backend
        setLoading(true);
        axios.get('http://localhost:5000/api/user')
            .then((response) => {
                const { displayname, profileImageUrl } = response.data;
                setDisplayname(displayname);
                setProfileImageUrl(profileImageUrl); // Set current profile image URL
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setError('Failed to fetch user data');
            });
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();

        // Basic validation
        if (!displayname) {
            setError('Display name is required');
            return;
        }

        if (!oldPassword) {
            setError('Old password is required');
            return;
        }

        if (password && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password && password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        // Prepare data for update
        const formData = new FormData();
        formData.append('displayname', displayname);
        formData.append('oldPassword', oldPassword);
        if (password) formData.append('password', password);
        if (profileImage) formData.append('profileImage', profileImage);

        // Send updated data to the backend
        axios.put('http://localhost:5000/api/user', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then(() => {
                setLoading(false);
                setSuccess('Profile updated successfully!');
                setOldPassword(''); // Clear old password field after success
                setPassword('');
                setConfirmPassword('');
                if (profileImage) setProfileImageUrl(URL.createObjectURL(profileImage));
                setProfileImage(null); // Clear the file input
            })
            .catch((error) => {
                setLoading(false);
                setError(error.response?.data?.error || 'An error occurred');
            });
    };

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file); // For uploading
            setProfileImageUrl(URL.createObjectURL(file)); // Preview image
        }
    };

    return (
        <div className="container" style={{ paddingTop: '3em' }}>
            <div id="settings-card" className="card shadow-none p-1" style={{ marginLeft: '100px', width: '500px' }}>
                <div className="card-body">
                    <h2>Settings</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}

                    <form onSubmit={handleUpdate}>
                        {/* Profile Image */}
                        <div className="text-center mb-3">
                            <img
                                src={profileImageUrl || '/default-profile.png'}
                                alt="Profile"
                                className="rounded-circle"
                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={handleProfileImageChange}
                            />
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
                                required
                            />
                            <label htmlFor="displayname">Display Name</label>
                        </div>

                        {/* Old Password */}
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="oldPassword"
                                placeholder="Old Password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="oldPassword">Old Password</label>
                        </div>

                        {/* New Password */}
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="New Password (optional)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password">New Password (optional)</label>
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

                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Setting;