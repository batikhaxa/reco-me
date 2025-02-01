import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';
import DOMPurify from 'dompurify';

const UserProfile = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();  
    const location = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams(location.search);
                const userId = queryParams.get('userId'); 
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/posts/userprofile?userId=${userId || ''}`, {
                    method: 'GET',  
                    credentials: 'include',  
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setPosts(data || []);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [location.search]);

    const PostCard = ({ post }) => {
        const tags = post.tags ? post.tags.split(', ') : [];
        return (
            <div className="card card-primary mb-3">
                <div className="card-body">
                    <div className="d-flex gap-2">
                        <img src={post.profile_picture || 'default-profile-pic.jpg'} alt="" width="70" height="70" className="rounded-circle me-2" onClick={() => navigate('/profile')} />
                        <h5 className="card-title">
                            <b>{post.displayname}</b> is recommending <b>{post.title}</b>
                        </h5>
                    </div>
                    <p
                        className="card-text"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(post.content.replace(/\n/g, '<br>')),
                        }}
                    ></p>
                    <div className="mt-2">
                        <div className="d-flex flex-wrap">
                            {tags.map((tag, index) => (
                                <label key={index} className="card-category d-inline-flex mb-1">
                                    <i className="bi bi-hash"></i> {tag}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

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
                return 'bi-person-check-fill'; // You can customize this for pending state
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

    return (
        <div className="scrollable-container pt-4 pt-md-3 pt-lg-3" data-bs-offset="0">
            <div className="container mx-0 mx-sm-5 mx-lg-5 mt-5">
                <div className="row justify-content-start m-0">
                    <div className="col-12 col-sm-12 col-md-9 col-lg-5">
                        <div className="card shadow-none p-1 mb-3">
                            <div className="card-body text-center">
                                <div className="d-flex justify-content-end">
                                    <FriendButton profileUserId={new URLSearchParams(location.search).get('userId')} />
                                </div>
                                <img
                                    src={posts[0]?.profile_picture || 'default-profile-pic.jpg'}
                                    className="rounded-circle"
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    alt="Profile"
                                  
                                />
                                <p className="fw-light fs-4 mt-3">{posts[0]?.displayname}</p>
                                {error && <div className="alert alert-danger mt-3">{error}</div>}
                            </div>
                        </div>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            posts.filter((_, index) => index % 2 === 0).map((post, index) => (
                                <PostCard key={`column1-${index}`} post={post} />
                            ))
                        )}
                    </div>
                    <div className="col-12 col-md-9 col-lg-5">
                        {!loading &&
                            posts.filter((_, index) => index % 2 !== 0).map((post, index) => (
                                <PostCard key={`column2-${index}`} post={post} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
