import React, { useEffect, useState } from 'react';
import Notifications from "./notifications";

const UserDropdown = () => {
    const [userData, setUserData] = useState({ displayname: '', profile_picture: '' });
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleNotificationsClick = () => {
        setShowNotifications(true);
    };

    const handleCloseNotifications = () => {
        setShowNotifications(false);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/sidebar`, {
                    method: 'POST',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchNotifications = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/friends/pending`, {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
                setError("Failed to fetch notifications");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
        fetchNotifications(); 
    }, []);

    return (
        <div className="dropdown mt-auto position-relative">
            {/* Dropdown Button */}
            <button
                className="d-flex align-items-center link-body-emphasis text-decoration-none btn btn-link p-0 text-decoration-none w-75"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <img
                    src={userData.profile_picture || 'default-profile-pic.jpg'}
                    alt="Profile"
                    width="50"
                    height="50"
                    className="rounded-circle me-2 ms-2"
                />
                <strong className="text-white fw-light fs-4">{userData.displayname || 'Guest'}</strong>
                <i className="bi bi-caret-down-fill" style={{ color: 'white' }}></i>
            </button>

            {/* Bell Icon */}
            <a
                href="#notifications"
                className="position-absolute top-50 end-0 translate-middle-y me-2"
                style={{ color: "white", textDecoration: "none" }}
                onClick={(e) => {
                    e.preventDefault();
                    handleNotificationsClick();
                }}
            >
                <i className="bi bi-bell-fill" style={{ fontSize: "1.3rem" }}></i>
                {notifications.length > 0 && (
                    <i className="bi bi-circle-fill" style={{ color: "red", fontSize: "0.6rem", position: "absolute", top: "0", right: "0" }}></i>
                )}
            </a>

            {/* Dropdown Menu */}
            <ul className="dropdown-menu ms-5 text-small shadow">
                <li>
                    <a className="dropdown-item" href="/settings">
                        settings
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="/profile">
                        profile
                    </a>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    <a className="dropdown-item" href="/logout">
                        log out
                    </a>
                </li>
            </ul>

            <Notifications
                show={showNotifications}
                onClose={handleCloseNotifications}
                notifications={notifications}
                setNotifications={setNotifications}
                loading={loading}
                error={error}
            />
        </div>
    );
};

export default UserDropdown;