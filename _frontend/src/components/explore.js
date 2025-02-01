import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

const PostCard = ({ post, loggedInUserId }) => {

    const navigate = useNavigate(); 
    return(
    <div className="d-flex justify-content-left">
        <div className="card card-primary mb-3">
            <div className="card-body d-flex flex-column">
                <div className="d-flex gap-2">
                    <button
                        className="border-0 bg-transparent p-0"
                        onClick={() => {
                            navigate(`/userprofile?userId=${post.sender_id}`);
                        }}
                        aria-label="View user profile" 
                    >
                        <img
                            src={post.profile_picture || 'default-profile-pic.jpg'}
                            alt=""
                            width="70"
                            height="70"
                            className="rounded-circle me-2"
                        />
                    </button>
                    <h5 className="card-title">
                        <b>{post.displayname}</b> is recommending <b>{post.title}</b>
                        {post.recipient_type === 'specific' && post.recipient_id === loggedInUserId && (
                            <span> to <b>you</b></span>
                        )}
                    </h5>
                </div>
                <div className="position-relative d-flex: column">
                        <p
                            className="card-text"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(post.content.replace(/\n/g, '<br>')),
                            }}
                        ></p>
                    <div className="d-flex flex-wrap">
                        {(post.tags?.includes(', ') ? post.tags.split(', ') : [post.tags || 'Unknown']).map((tag, index) => (
                            <label key={index} className="card-category d-inline-flex mb-1">
                                <i className="bi bi-hash"></i> {tag}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div> 
);
}
const fetchLoggedInUserId = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/id`, {
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.loggedInUserId;
    } catch (error) {
        console.error('Error fetching loggedInUserId:', error);
        return null;
    }
};

const Explore = () => {
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    useEffect(() => {
            const fetchUserId = async () => {
                const userId = await fetchLoggedInUserId();
                setLoggedInUserId(userId);
            };
            fetchUserId();
        }, []);

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
                credentials: 'include',
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
                        {/* Column 1 */}
                        {loading ? (
                            <p>Loading...</p>
                        ) : columnOnePosts.length > 0 ? (
                            columnOnePosts.map((post, index) => (
                                <PostCard key={index} post={post} loggedInUserId={loggedInUserId} />
                            ))
                        ) : (
                            <p>No posts found.</p>
                        )}
                    </div>
                    {/* Column 2 */}
                    <div className="col-12 col-md-9 col-lg-5">
                        {loading ? (
                            <p>Loading...</p>
                        ) : columnTwoPosts.length > 0 ? (
                            columnTwoPosts.map((post, index) => (
                                <PostCard key={index} post={post} loggedInUserId={loggedInUserId}  />
                            ))
                        ) : (
                            <p></p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Explore;
