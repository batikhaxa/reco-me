import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDropdown = () => {
    const [userData, setUserData] = useState({ displayname: '', profile_picture: '' });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.post('/api/user/sidebar'); 
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);
    return (
        <div className="dropdown mt-auto">
            <a
                href="#"
                className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <img
                    src={userData.profile_picture || 'default-profile-pic.jpg'} // Fallback to default image if none
                    alt=""
                    width="50"
                    height="50"
                    className="rounded-circle me-2 ms-2"
                />
                <strong className="text-white fw-light fs-4">{userData.displayname || 'Guest'}</strong>
            </a>
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
