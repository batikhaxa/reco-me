import React, { useState, useEffect } from 'react';

const Settings = () => {
    const [displayname, setDisplayname] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null); // For file upload
    const [profileImageUrl, setProfileImageUrl] = useState(''); // For displaying current or uploaded profile image
    const [onlineProfileImageLink, setOnlineProfileImageLink] = useState(''); // For online link
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Fetch current user data from the backend
        setLoading(true);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/sidebar`, {
            method: 'POST',
            credentials: 'include', // Send cookies with the request
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                const { displayname, profileImageUrl } = data;
                setDisplayname(displayname);
                setProfileImageUrl(profileImageUrl);
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
            setError('Current password is required');
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
        if (profileImage) {
            formData.append('profileImage', profileImage);
        } else if (onlineProfileImageLink) {
            formData.append('onlineProfileImageLink', onlineProfileImageLink);
        }

        // Send updated data to the backend
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user`, {
            method: 'PUT',
            headers: { 'Content-Type': 'multipart/form-data' },
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
                setOldPassword(''); // Clear old password field after success
                setPassword('');
                setConfirmPassword('');
                if (profileImage) {
                    setProfileImageUrl(URL.createObjectURL(profileImage));
                } else if (onlineProfileImageLink) {
                    setProfileImageUrl(onlineProfileImageLink); // Update with online link
                }
                setProfileImage(null); // Clear the file input
                setOnlineProfileImageLink(''); // Clear online link field
            })
            .catch((error) => {
                setLoading(false);
                setError(error.message || 'An error occurred');
            });
    };

    // const handleProfileImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setProfileImage(file); // For uploading
    //         setProfileImageUrl(URL.createObjectURL(file)); // Preview image
    //         setOnlineProfileImageLink(''); // Clear online link field
    //     }
    // };

    const handleOnlineImageLinkChange = (e) => {
        const link = e.target.value;
        setOnlineProfileImageLink(link); // Set online link
        setProfileImage(null); // Clear uploaded file
        setProfileImageUrl(link); // Preview online image
    };

    return (
        <div className="scrollable-container pt-4 pt-md-3 pt-lg-3" data-bs-offset="0">
            <div className="container mx-0 mx-sm-5 mx-lg-5 mt-5">
                <div className="row m-0">
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
                                    <i className="bi bi-gear fs-5"></i>
                                    <p className="text-lowercase fs-4">settings</p>
                                </label>
                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && <div className="alert alert-success">{success}</div>}

                                <form onSubmit={handleUpdate}>
                                    {/* Profile Image */}
                                    <div className="text-center mb-3">
                                        <img
                                            src={profileImageUrl || 'https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg'}
                                            alt="Profile Picture"
                                            className="rounded-circle"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <p class="text-center font-weight-bold">{displayname}</p> 
                                    {/* <div className="form-group mb-3">
                                    <label>Upload Profile Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={handleProfileImageChange}
                                    />
                                </div> */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Image URL"
                                            value={onlineProfileImageLink}
                                            onChange={handleOnlineImageLinkChange}
                                            required
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
                                            required
                                        />
                                        <label htmlFor="displayname">Display Name</label>
                                    </div>
                                    <p class="text-center text-lowercase fs-5">Change Password</p>

                                    {/* Old Password */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="oldPassword"
                                            placeholder="Current Password"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            required
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
                </div>
            </div>
        </div>
    );
};

export default Settings;
