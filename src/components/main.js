// src/components/Main.js
import React, { useEffect, useState, useRef } from 'react';

const Main = () => {
    const [postsPrimary, setPostsPrimary] = useState([]);
    const [postsSecondary, setPostsSecondary] = useState([]);
    const loggedInUserId = 1;
    useEffect(() => {
        const fetchPrimaryPosts = async () => {
            try {
                const response = await fetch('/api/posts/primary');
                const data = await response.json();
                setPostsPrimary(data);
            } catch (error) {
                console.error('Error fetching primary posts:', error);
            }
        };
        const fetchSecondaryPosts = async () => {
            try {
                const response = await fetch('/api/posts/secondary');
                const data = await response.json();
                setPostsSecondary(data);
            } catch (error) {
                console.error('Error fetching secondary posts:', error);
            }
        };
        fetchPrimaryPosts();
        fetchSecondaryPosts();
    }, []);
    return (
        <div className="scrollable-container" data-bs-offset="0">
            <div className="container mx-0 mx-sm-5 mx-lg-5 mt-5">
                <div className="row justify-content-start">
                    {/* Primary Posts */}
                    <div className="col-12 col-sm-12 col-md-9 col-lg-5">
                        {postsPrimary.map((post, index) => (
                            <div key={index} className="d-flex justify-content-start">
                                <div className="card card-main mb-3">
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
                                                {post.recipient_type === 'specific' && post.recipient_id === loggedInUserId && (
                                                    <span> to <b>you</b></span>
                                                )}
                                            </h5>
                                        </div>
                                        <p className="card-text">{post.content}</p>
                                        <div className="d-flex flex-wrap">
                                            {(post.tags?.split(', ') || ['Unknown']).map((tag, tagIndex) => (
                                                <label key={tagIndex} className="card-category d-inline-flex mb-1">
                                                    <i className="bi bi-film"></i> {tag}
                                                </label>
                                            ))}
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-end">
                                            <a href="/comments" className="link-icon">
                                                <i className="bi bi-chat-dots"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Secondary Posts */}
                    <div className="col-12 col-sm-12 col-md-9 col-lg-5">
                        {postsSecondary.map((post, index) => (
                            <div key={index} className="d-flex justify-content-start">
                                <div className="card card-main mb-3">
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
                                                <b>{post.displayname}</b>, friend of {post.sourceFriendId}:
                                                <b> {post.sourceFriendDisplayName}</b>, is recommending <b>{post.title}</b>
                                                {post.recipient_type === 'specific' && post.recipient_id === loggedInUserId && (
                                                    <span> to <b>you</b></span>
                                                )}
                                            </h5>
                                        </div>
                                        <p className="card-text">{post.content}</p>
                                        <div className="d-flex flex-wrap">
                                            {(post.tags?.split(', ') || ['Unknown']).map((tag, tagIndex) => (
                                                <label key={tagIndex} className="card-category d-inline-flex mb-1">
                                                    <i className="bi bi-film"></i> {tag}
                                                </label>
                                            ))}
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-end">
                                            <a href="/comments" className="link-icon">
                                                <i className="bi bi-chat-dots"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
