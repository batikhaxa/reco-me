import React, { useState, useEffect, useCallback } from 'react';

const Explore = () => {
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleKeyDown = (e) => {
        if ((e.key === 'Enter' || e.key === ',') && inputValue.trim() !== "") {
            e.preventDefault();
            if (!tags.includes(inputValue.trim())) {
                setTags([...tags, inputValue.trim()]);
            }
            setInputValue("");
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        try {
            const url = tags.length > 0
                ? `${process.env.REACT_APP_BACKEND_URL}/api/posts/search?tags=${tags.join(',')}`
                : `${process.env.REACT_APP_BACKEND_URL}/api/posts/public`;

            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include', // Include cookies for session validation
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    }, [tags]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const columnOnePosts = posts.filter((_, index) => index % 2 === 0);
    const columnTwoPosts = posts.filter((_, index) => index % 2 !== 0);

    return (
        <div className="scrollable-container pt-4">
            <div className="container mx-0 mt-5">
                <div className="row justify-content-start">
                    <div className="col-lg-5">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by tags..."
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <div className="mt-2">
                                    {tags.map((tag, index) => (
                                        <span key={index} className="badge bg-primary me-1">
                                            {tag} <button type="button" className="btn-close btn-close-white ms-1" onClick={() => removeTag(tag)} aria-label="Remove tag"></button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {loading ? (
                            <p>Loading...</p>
                        ) : columnOnePosts.length > 0 ? (
                            columnOnePosts.map((post, index) => (
                                <div key={index} className="card mb-3">
                                    <div className="card-body">
                                        <h5>{post.title}</h5>
                                        <p>{post.content}</p>
                                        <div>
                                            {post.tags?.split(', ').map((tag, tagIndex) => (
                                                <span key={tagIndex} className="badge bg-secondary me-1">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No posts found.</p>
                        )}
                    </div>

                    <div className="col-lg-5">
                        {loading ? (
                            <p>Loading...</p>
                        ) : columnTwoPosts.length > 0 ? (
                            columnTwoPosts.map((post, index) => (
                                <div key={index} className="card mb-3">
                                    <div className="card-body">
                                        <h5>{post.title}</h5>
                                        <p>{post.content}</p>
                                        <div>
                                            {post.tags?.split(', ').map((tag, tagIndex) => (
                                                <span key={tagIndex} className="badge bg-secondary me-1">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No posts found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Explore;
