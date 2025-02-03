import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FriendButton = ({ profileUserId }) => {
    const [friendshipStatus, setFriendshipStatus] = useState('not_friends');
    const [isHovered, setIsHovered] = useState(false);
    const [displayname, setDisplayname] = useState('');

    useEffect(() => {
        const fetchFriendship = async (profileUserId) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/friends/${profileUserId}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setDisplayname(data.displayname); // Set the displayname
                return data.status; // 'accepted', 'pending', 'not_friends'
            } catch (error) {
                console.error('Error fetching friendship status:', error);
                return 'not_friends'; // Default to 'not_friends' in case of error
            }
        };

        const getFriendshipStatus = async () => {
            const status = await fetchFriendship(profileUserId);
            setFriendshipStatus(status);
        };

        getFriendshipStatus();
    }, [profileUserId]);

    const handleAddFriend = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/friends/${profileUserId}/add`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setFriendshipStatus('pending');
            toast.success(
                <span>
                    Friend request sent to <strong>{displayname}</strong>
                </span>,
                {
                    icon: ({ theme, type }) => <i className="bi bi-envelope-check"></i>
                }
            );
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    };

    const handleRemoveFriend = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/friends/${profileUserId}/remove`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            if (friendshipStatus === 'pending') {
                toast.info(
                    <span>
                        Friend request to <strong>{displayname}</strong> removed.
                    </span>,
                    {
                        icon: ({ theme, type }) => <i className="bi bi-envelope-x me-2"></i>
                    }
                );
            }
            // Friendship removed
            else if (friendshipStatus === 'accepted') {
                toast.warning(
                    <span>
                        Friendship with <strong>{displayname}</strong> removed. You will no longer be able to see each other's posts.
                    </span>,
                    {
                        icon: ({ theme, type }) => <i className="bi bi-person-x-fill me-2"></i>
                    }
                );
            }

            setFriendshipStatus('not_friends');
        } catch (error) {
            console.error('Error removing friend:', error);
        }
    };

    const getButtonIcon = () => {
        if (friendshipStatus === 'accepted') {
            return isHovered ? 'bi-person-dash-fill' : 'bi-person-check-fill';
        } else if (friendshipStatus === 'pending') {
            return isHovered ? 'bi-hourglass-bottom' : 'bi-hourglass'; // Pending state icons
        } else {
            return isHovered ? 'bi-person-plus-fill' : 'bi-person-fill'; // Not friends state icons
        }
    };

    const handleClick = () => {
        if (friendshipStatus === 'accepted') {
            handleRemoveFriend();
        } else if (friendshipStatus === 'not_friends') {
            handleAddFriend();
        } else if (friendshipStatus === 'pending') {
            handleRemoveFriend();
        }
    };

    return (
        <>
            <button
                className="btn btn-outline-dark rounded position-absolute p-0"
                style={{ aspectRatio: '1/1' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleClick}
            >
                <i className={`bi ${getButtonIcon()}`}></i>
            </button>
        </>
    );
};

export default FriendButton;