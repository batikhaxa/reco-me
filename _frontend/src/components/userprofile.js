import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';
import DOMPurify from 'dompurify';
import FriendButton from './friendbutton';

const UserProfile = () => {
    const [posts, setPosts] = useState([]);
    const [userInfo, setUserInfo] = useState({});
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
                setPosts(data.posts);
                setUserInfo(data.userInfo || {});
                
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
                                    src={userInfo.profile_picture || 'default-profile-pic.jpg'}
                                    className="rounded-circle"
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    alt="Profile"
                                  
                                />
                                <p className="fw-light fs-4 mt-3">{userInfo.displayname}</p>
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
