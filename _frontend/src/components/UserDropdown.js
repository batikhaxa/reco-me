import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
const UserDropdown = () => {
    const [userData, setUserData] = useState({ displayname: '', profile_picture: '' });
    const navigate = useNavigate(); 

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

        fetchUserData();
    }, []);

    return (
        <div className="dropdown mt-auto">
            <button
                className="d-flex align-items-center link-body-emphasis text-decoration-none btn btn-link p-0 text-decoration-none"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <img
                    src={userData.profile_picture || 'default-profile-pic.jpg'} 
                    alt="Profile"
                    width="50"
                    height="50"
                    className="rounded-circle me-2 ms-2"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                        e.stopPropagation(); 
                        navigate('/profile'); 
                    }}
                />
                <strong className="text-white fw-light fs-4">{userData.displayname || 'Guest'}</strong>
                <i 
                    className="bi bi-caret-down-fill"
                    style={{color:'white'}}
                ></i>
            </button>
            <ul className="dropdown-menu ms-5 text-small shadow">
                <li>
                    <a className="dropdown-item" href="/settings">
                        Settings
                    </a>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    <a className="dropdown-item" href="/logout">
                        Log out
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default UserDropdown;
