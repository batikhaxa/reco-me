import React, { useState,  useEffect,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
const FriendButton = ({ profileUserId }) => {
    const [friendshipStatus, setFriendshipStatus] = useState('not_friends');
    const [isHovered, setIsHovered] = useState(false);

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

            setFriendshipStatus('not_friends');
        } catch (error) {
            console.error('Error removing friend:', error);
        }
    };

    const getButtonIcon = () => {
        if (friendshipStatus === 'accepted') {
            return isHovered ? 'bi-person-dash-fill' : 'bi-person-check-fill';
        } else if (friendshipStatus === 'pending') {
            return 'bi-person-check-fill'; 
        } else {
            return isHovered ? 'bi-person-plus-fill' : 'bi-person-fill';
        }
    };

    const handleClick = () => {
        if (friendshipStatus === 'accepted') {
            handleRemoveFriend();
        } else if (friendshipStatus === 'not_friends') {
            handleAddFriend();
        }
    };
    return (
        <button
            className="btn btn-outline-dark rounded position-absolute p-0"
            style={{ aspectRatio: '1/1' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            <i className={`bi ${getButtonIcon()}`}></i>
        </button>
    );
};

const PostCard = ({ user, navigate }) => (
    <div className="d-flex justify-content-left">
        <div className="card card-primary  mb-3 position-relative">
           <div className="card-body p-2 d-flex flex-column">
                <div className="d-flex gap-1 ">
                                    <div className='d-flex  align-items-center' key={user.user_id} >
                                            
                                            
                                                <button
                                                        className="btn btn-primary"
                                                        onClick={() => navigate(`/userprofile?userId=${user.user_id}`)}
                                                    >
                                                
                                                    <img
                                                        src={user.profile_picture || 'default-profile-pic.jpg'}
                                                        alt={user.displayname}
                                                        width="50"
                                                        height="50"
                                                        className="rounded-circle me-2"
                                                    />
                                                </button>
                                                    <span className="text fw-light fs-4  ">{user.displayname}</span>
                                                   
                                                   
                                    </div>
                                               
                                    <div className="position-relative  mr-auto p-2">
                                                    <FriendButton profileUserId={user.user_id} />
                                                </div>
                                            
                        </div>
                    
                </div>
        </div>
    </div>
);

const UserSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchQuery.trim() !== "") {
            e.preventDefault();
            fetchUsers(searchQuery.trim());
        }
    };

    const fetchUsers = useCallback(async (query) => {
        if (!query) return;

        setLoading(true);
        console.log("Searching for:", query);
        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/api/posts/finduser?name=${encodeURIComponent(query)}`;
            console.log("Request URL:", url);
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const columnOneUsers = users.filter((_, index) => index % 2 === 0);
    const columnTwoUsers = users.filter((_, index) => index % 2 !== 0);

   

    return (
        <div className="scrollable-container pt-4 pt-md-3 pt-lg-3" data-bs-offset="0">
            <div className="container mx-0 mx-sm-5 mx-lg-5 mt-5">
                <div className="row justify-content-start m-0"> 
                    {/* Search Bar */}
                    <div className="col-12 col-sm-12 col-md-9 col-lg-5">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search-heart me-2" viewBox="0 0 16 16">
                                        <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018" />
                                        <path d="M13 6.5a6.47 6.47 0 0 1-1.258 3.844q.06.044.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11" />
                                    </svg>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by name..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        style={{ backgroundColor: 'transparent' }}
                                    />
                                </div>
                            </div>
                        </div>
                  

                    {/* Column 1 */}
                 
                        {loading ? (
                            <p>Loading...</p>
                        ) : columnOneUsers.length > 0 ? (
                            <div className="row">
                                {columnOneUsers.map((user, index) => (
                                    <PostCard key={index} user={user} navigate={navigate} />
                                ))}
                            </div>
                        ) : (
                            <p>No users found.</p>
                        )}
                    </div>

                    {/* Column 2 */}
                    <div className="col-12 col-md-9 col-lg-5">
                        {loading ? (
                            <p>Loading...</p>
                        ) : columnTwoUsers.length > 0 ? (
                            <div className="row">
                                {columnTwoUsers.map((user, index) => (
                                    <PostCard key={index} user={user} navigate={navigate} />
                                ))}
                            </div>
                        ) : (
                            <p></p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSearch;
