import React, { useEffect, useState } from 'react';

const UserDropdown = () => {
    const [userData, setUserData] = useState({ displayname: '', profile_picture: '' });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/sidebar`, {
                    method: 'POST',
                    credentials: 'include', // Ensures cookies are sent with the request
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

        fetchUserData();
    }, []);
    return (
        <div className="dropdown mt-auto">
            <button
                className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle btn btn-link p-0 text-decoration-none"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <img
                    src={userData.profile_picture || 'default-profile-pic.jpg'} 
                    alt=""
                    width="50"
                    height="50"
                    className="rounded-circle me-2 ms-2 object-fit-cover"
                />
                <strong className="text-white fw-light fs-4">{userData.displayname || 'Guest'}</strong>
            </button>
            <ul className="dropdown-menu ms-5 text-small shadow">
                <li>
                    <a className="dropdown-item" href="/settings">
                        settings
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
        </div>
    );
};

export default UserDropdown;
