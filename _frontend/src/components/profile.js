import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [displayname, setDisplayname] = useState('');
    const [posts, setPosts] = useState([]);
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/sidebar`, {
                    method: 'POST',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                setDisplayname(data.displayname || '');
                setProfileImageUrl(data.profile_picture || '');
                setPosts(data.posts || []);
            } catch (error) {
                setError('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
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

    const PostCard = ({ post, onUpdatePost }) => {
        const [isEditing, setIsEditing] = useState(false);
        const [editedContent, setEditedContent] = useState(post.content);
        const [editedTitle, setEditedTitle] = useState(post.title);
        const [tags, setTags] = useState(post.tags ? post.tags.split(', ') : []);
        const [inputValue, setInputValue] = useState('');

        const handlePostContentChange = (event) => {
            setEditedContent(event.target.value);
            const textarea = event.target;
            textarea.style.height = "auto"; // reset height
            textarea.style.height = `${textarea.scrollHeight}px`; // set height to content
        };

        const handleSave = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/posts/update/${post.id}`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title: editedTitle, content: editedContent }),
                });

                if (!response.ok) {
                    throw new Error('Failed to update post');
                }

                onUpdatePost(post.id, editedTitle, editedContent); // Update the state in parent
                setIsEditing(false);
            } catch (error) {
                console.error('Error updating post:', error);
            }
        };

        const handleCombinedChange = (e) => {
            setEditedContent(e.target.value); // Updates local state
            handlePostContentChange(e); // Calls the additional function
        };

        const handleKeyDown = (e) => {
            if ((e.key === 'Enter' || e.key === ',') && inputValue.trim() !== '') {
                e.preventDefault();
                if (!tags.includes(inputValue.trim())) {
                    setTags([...tags, inputValue.trim()]);
                }
                setInputValue('');
            }
        };

        const removeTag = (tagToRemove) => {
            setTags(tags.filter(tag => tag !== tagToRemove));
        };

        return (
            <div className="card card-primary mb-3">
                <div className="card-body">
                    <div className="d-flex gap-2">
                        <img
                            src={post.profile_picture || 'default-profile-pic.jpg'}
                            alt=""
                            width="70"
                            height="70"
                            className="rounded-circle me-2"
                        />
                        <h5 className="card-title">
                            <b>{post.displayname}</b> is recommending{' '}
                            {isEditing ? (
                                <input
                                    className="form-control form-control-lg text-muted bg-transparent border-0"
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                />
                            ) : (
                                <b>{post.title}</b>
                            )}
                        </h5>
                    </div>

                    {isEditing ? (
                        <textarea
                            className="form-control text-muted bg-transparent"
                            placeholder="Describe what you're recommending..."
                            rows="3"
                            value={editedContent}
                            onChange={handleCombinedChange}
                        ></textarea>
                    ) : (
                        <p className="card-text">{post.content}</p>
                    )}

                    {/* Editable Tags */}
                    <div className="mt-2">
                        {isEditing ? (
                            <>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Input tag..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    style={{ backgroundColor: 'transparent' }}
                                />
                                <div className="mt-1">
                                    {tags.map((tag, index) => (
                                        <label key={index} className="card-category d-inline-flex mb-1">
                                            <i className="bi bi-hash"></i> {tag}
                                            <button
                                                type="button"
                                                className="btn-close btn-close-black ms-1"
                                                onClick={() => removeTag(tag)}
                                                aria-label="Remove tag"
                                            ></button>
                                        </label>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="d-flex flex-wrap">
                                {tags.map((tag, tagIndex) => (
                                    <label key={tagIndex} className="card-category d-inline-flex mb-1">
                                        <i className="bi bi-hash"></i> {tag}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="d-flex justify-content-end">
                        {isEditing ? (
                            <>
                                <button className="btn btn-outline-dark rounded me-2" onClick={handleSave}>
                                    <i className="bi bi-check p-0 m-0"></i>
                                </button>
                                <button className="btn btn-outline-dark rounded me-2" onClick={() => setIsEditing(false)}>
                                    <i className="bi bi-x p-0 m-0"></i>
                                </button>
                            </>
                        ) : (
                            <button className="btn btn-outline-dark rounded me-2" onClick={() => setIsEditing(true)}>
                                <i className="bi bi-pencil p-0 m-0"></i>
                            </button>
                        )}
                        <button className="btn btn-outline-dark rounded">
                            <i className="bi bi-trash p-0 m-0"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="scrollable-container pt-4 pt-md-3 pt-lg-3" data-bs-offset="0">
            <div className="container mx-0 mx-sm-5 mx-lg-5 mt-5">
                <div className="row justify-content-start m-0">
                    {/* Profile Section */}
                    <div className="col-12 col-sm-12 col-md-9 col-lg-5">
                        <div className="card shadow-none p-1 mb-3">
                            <div className="card-body text-center">
                                <img
                                    src={profileImageUrl || 'default-profile-pic.jpg'}
                                    className="rounded-circle"
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    alt="Profile"
                                />
                                <p className="fw-light fs-4 mt-3">{displayname}</p>
                                {error && <div className="alert alert-danger mt-3">{error}</div>}
                            </div>
                        </div>

                        {/* Posts Section - Column One */}
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            columnOnePosts.map((post, index) => (
                                <PostCard key={`column1-${index}`} post={post} />
                            ))
                        )}
                    </div>

                    {/* Posts Section - Column Two */}
                    <div className="col-12 col-md-9 col-lg-5">
                        {!loading &&
                            columnTwoPosts.map((post, index) => (
                                <PostCard key={`column2-${index}`} post={post} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;