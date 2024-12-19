import React, { useEffect, useState } from 'react';

const Main = () => {
    const [postsPrimary, setPostsPrimary] = useState([]);
    const [postsSecondary, setPostsSecondary] = useState([]);
    const loggedInUserId = 1;

    useEffect(() => {
        const fetchPrimaryPosts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/posts/primary', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setPostsPrimary(data);
            } catch (error) {
                console.error('Error fetching primary posts:', error);
            }
        };

        const fetchSecondaryPosts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/posts/secondary', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setPostsSecondary(data);
            } catch (error) {
                console.error('Error fetching secondary posts:', error);
            }
        };

        fetchPrimaryPosts();
        fetchSecondaryPosts();
    }, []);
    const latestPostByUser = postsPrimary.reduce((acc, post) => {
        if (!acc[post.sender_id] || new Date(post.created_at) > new Date(acc[post.sender_id].created_at)) {
            acc[post.sender_id] = post;
        }
        return acc;
    }, {});
    return (
        <div className="scrollable-container pt-4 pt-md-3 pt-lg-3">
            <canvas
                ref={canvasRef}
                id="connection-lines"
                style={{ position: 'absolute', zIndex: -1, top: 0, left: 0 }}
            />
            <div className="container mx-0 mx-sm-5 mx-lg-5 mt-5">
                <div className="row justify-content-start">
                    {postsPrimary.map((primaryPost, index) => {
                        // group secondary posts by sourceFriendId and keep only the most recent post for each
                        const latestSecondaryPosts = postsSecondary.reduce((acc, post) => {
                            if (
                                !acc[post.sourceFriendId] ||
                                new Date(post.created_at) > new Date(acc[post.sourceFriendId].created_at)
                            ) {
                                acc[post.sourceFriendId] = post;
                            }
                            return acc;
                        }, {});
                        const relatedSecondaryPosts =
                            latestPostByUser[primaryPost.sender_id] === primaryPost
                                ? Object.values(latestSecondaryPosts).filter(
                                    (post) => post.sourceFriendId === primaryPost.sender_id
                                )
                                : [];
                        return (
                            <div key={index} className="row m-0">
                                {/* Primary Post */}
                                <div className="col-12 col-sm-12 col-md-9 col-lg-5">
                                    <div className="card mb-4 card-main">
                                        <div className="card-body d-flex flex-column">
                                            <div className="d-flex gap-2">
                                                <img
                                                    src={primaryPost.profileImage || 'https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg'}
                                                    alt=""
                                                    width="70"
                                                    height="70"
                                                    className="rounded-circle me-2"
                                                />
                                                <h5 className="card-title">
                                                    <b>{primaryPost.displayname}</b> recommends <b>{primaryPost.title}</b>
                                                    {primaryPost.recipient_type === 'specific' &&
                                                        primaryPost.recipient_id === loggedInUserId && (
                                                            <span> to <b>you</b></span>
                                                        )}
                                                </h5>
                                            </div>
                                            <p className="card-text">{primaryPost.content}</p>
                                            <div className="d-flex flex-wrap">
                                                {(primaryPost.tags?.split(', ') || ['Unknown']).map((tag, tagIndex) => (
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

                                {/* Secondary Posts */}
                                <div className="col-12 col-sm-12 col-md-9 col-lg-5 d-none d-md-block">
                                    {relatedSecondaryPosts.map((secondaryPost, secIndex) => (
                                        <div key={secIndex} className="card card-secondary mb-0">
                                            <div className="card-body d-flex flex-column">
                                                <div className="d-flex gap-2">
                                                    <img
                                                        src={secondaryPost.profileImage || 'https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg'}
                                                        alt=""
                                                        width="70"
                                                        height="70"
                                                        className="rounded-circle me-2"
                                                    />
                                                    <h5 className="card-title">
                                                        <b>{secondaryPost.displayname}</b>, friend of{' '}
                                                        <b>{secondaryPost.sourceFriendDisplayName}</b>, recommends{' '}
                                                        <b>{secondaryPost.title}</b>
                                                        {secondaryPost.recipient_type === 'specific' &&
                                                            secondaryPost.recipient_id === loggedInUserId && (
                                                                <span> to <b>you</b></span>
                                                            )}
                                                    </h5>
                                                </div>
                                                <p className="card-text">{secondaryPost.content}</p>
                                                <div className="d-flex flex-wrap">
                                                    {(secondaryPost.tags?.split(', ') || ['Unknown']).map((tag, tagIndex) => (
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
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Main;
