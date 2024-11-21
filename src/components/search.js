import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const loggedInUserId = 1;

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

    const fetchPosts = async () => {
        if (tags.length === 0) return; // Don't search if there are no tags

        setLoading(true);
        if (tags.length > 0) {
            try {
                const response = await axios.get('/api/posts/search', {
                    params: {
                        userId: loggedInUserId,
                        tags: tags.join(',') // Join tags as a comma-separated string
                    }
                });
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts", error);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts(); // Fetch posts whenever tags change
    }, [tags]);

    const columnOnePosts = posts.filter((_, index) => index % 2 === 0);
    const columnTwoPosts = posts.filter((_, index) => index % 2 !== 0);

    return (
        <div className="scrollable-container" data-bs-offset="0">
            <div className="container m-5">
                <div className="row justify-content-start">
                    {/* First Column */}
                    <div className="col col-lg-5 border">
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
                                        placeholder="Input tag..."
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        style={{ backgroundColor: 'transparent' }}
                                    />
                                </div>
                                <div className="mt-1">
                                    {tags.map((tag, index) => (
                                        <label key={index} className="card-category d-inline-flex mb-1">
                                            {tag} <button type="button" className="btn-close btn-close-black ms-1" onClick={() => removeTag(tag)} aria-label="Remove tag"></button>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Show posts if any */}
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            columnOnePosts.length > 0 ? (
                                columnOnePosts.map((post, index) => (
                                    <div key={index} className="d-flex justify-content-left">
                                        <div className="card card-primary mb-3">
                                            <div className="card-body d-flex flex-column">
                                                <div className="d-flex gap-2">
                                                    <img
                                                        src={post.profileImage || 'https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg'}
                                                        alt=""
                                                        width="70"
                                                        height="70"
                                                        className="rounded-circle me-2"
                                                    />
                                                    <h5 className="card-title">
                                                        <b>{post.displayname}</b> is recommending <b>{post.title}</b>
                                                        {post.recipient_type === 'specific' && post.recipient_id === loggedInUserId ? (
                                                            <span> to <b>you</b></span>
                                                        ) : null}
                                                    </h5>
                                                </div>
                                                <div className="position-relative d-flex: column" style={{ padding: "1.5rem 0" }}>
                                                    <p className="card-text">{post.content}</p>
                                                    <div className="d-flex flex-wrap">
                                                        {(post.tags?.includes(', ') ? post.tags.split(', ') : [post.tags || 'Unknown']).map((tag, tagIndex) => (
                                                            <label key={tagIndex} className="card-category d-inline-flex mb-1">
                                                                <i className="bi bi-film"></i> {tag}
                                                            </label>
                                                        ))}
                                                    </div>
                                                    <div className="d-flex flex-wrap justify-content-end">
                                                        <a href="/comments" className="link-icon">Comments</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No posts found.</p>
                            )
                        )}
                    </div>
                    {/* End of First Column */}

                    {/* Second Column */}
                    <div className="col col-lg-5 border">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            columnTwoPosts.length > 0 ? (
                                columnTwoPosts.map((post, index) => (
                                    <div key={index} className="d-flex justify-content-left">
                                        <div className="card card-primary mb-3">
                                            <div className="card-body d-flex flex-column">
                                                <div className="d-flex gap-2">
                                                    <img
                                                        src={post.profileImage || 'https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg'}
                                                        alt=""
                                                        width="70"
                                                        height="70"
                                                        className="rounded-circle me-2"
                                                    />
                                                    <h5 className="card-title">
                                                        <b>{post.displayname}</b> is recommending <b>{post.title}</b>
                                                        {post.recipient_type === 'specific' && post.recipient_id === loggedInUserId ? (
                                                            <span> to <b>you</b></span>
                                                        ) : null}
                                                    </h5>
                                                </div>
                                                <div className="position-relative d-flex: column" style={{ padding: "1.5rem 0" }}>
                                                    <p className="card-text">{post.content}</p>
                                                    <div className="d-flex flex-wrap">
                                                        {(post.tags?.includes(', ') ? post.tags.split(', ') : [post.tags || 'Unknown']).map((tag, tagIndex) => (
                                                            <label key={tagIndex} className="card-category d-inline-flex mb-1">
                                                                <i className="bi bi-film"></i> {tag}
                                                            </label>
                                                        ))}
                                                    </div>
                                                    <div className="d-flex flex-wrap justify-content-end">
                                                        <a href="/comments" className="link-icon">Comments</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p></p>
                            )
                        )}
                    </div>
                    {/* End of Second Column */}
                </div>
            </div>
        </div>
    );
};

export default Search;
