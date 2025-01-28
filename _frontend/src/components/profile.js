import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [displayname, setDisplayname] = useState('');
    const [posts, setPosts] = useState([]);
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isImageValid, setIsImageValid] = useState(true);
    const loggedInUserId = 1;

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/sidebar`, {
            method: 'POST',
            credentials: 'include',
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setDisplayname(data.displayname || '');
                setProfileImageUrl(data.profile_picture || '');
                setPosts(data.posts || []);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setError('Failed to fetch user data');
            });
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/posts/profile`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setPosts(data || []);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const columnOnePosts = posts.filter((_, index) => index % 2 === 0);
    const columnTwoPosts = posts.filter((_, index) => index % 2 !== 0);

    const PostCard = ({ post }) => (
        <div className="card card-primary mb-3">
            <div className="card-body">
                <div className="d-flex gap-2">
                    <img
                        src={post.profile_picture || 'https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg'}
                        alt=""
                        width="70"
                        height="70"
                        className="rounded-circle me-2"
                    />
                    <h5 className="card-title">
                        <b>{post.displayname}</b> is recommending <b>{post.title}</b>
                        {post.recipient_type === 'specific' && post.recipient_id === loggedInUserId && (
                            <span> to <b>you</b></span>
                        )}
                    </h5>
                </div>
                <p className="card-text">{post.content}</p>
                <div className="d-flex flex-wrap">
                    {(post.tags?.split(', ') || []).map((tag, tagIndex) => (
                        <label key={tagIndex} className="card-category d-inline-flex mb-1">
                            <i className="bi bi-film"></i> {tag}
                        </label>
                    ))}
                </div>
                <div className="d-flex justify-content-end">
                    <a href="/comments" className="link-icon">Comments</a>
                </div>
            </div>
        </div>
    );

    return (
        <div className="scrollable-container pt-4 pt-md-3 pt-lg-3" data-bs-offset="0">
            <div className="container mx-0 mx-sm-5 mx-lg-5 mt-5">
                <div className="row">
                    {/* Profile Section */}
                    <div className="col-12 col-md-4">
                        <div className="card shadow-none p-1 mb-5">
                            <div className="card-body text-center">
                                <img
                                    src={profileImageUrl || 'default-profile-pic.jpg'}
                                    className="rounded-circle"
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    alt="Profile"
                                    onError={() => setIsImageValid(false)}
                                />
                                <p className="fw-light fs-4 mt-3">{displayname}</p>
                            </div>
                        </div>
                  
                    {/* Posts Section */}
                 
                        <div className="col-12">
                        
                            {loading ? <p>Loading...</p> : columnOnePosts.map((post, index) => (
                                <PostCard key={`column1-${index}`} post={post} />
                            ))}
                        </div>
                            
                        </div>

        
                        <div className="col-12 col-lg-5">
                     
                            {loading ? null : columnTwoPosts.map((post, index) => (
                                <PostCard key={`column2-${index}`} post={post} />
                            ))}
                        </div>
                    </div>
               
            </div>
        </div>
    );
};

export default Profile;
