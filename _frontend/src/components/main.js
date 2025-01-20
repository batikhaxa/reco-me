import React, { useEffect, useLayoutEffect, useState, useCallback, useRef } from 'react';

const Main = () => {
    const [postsPrimary, setPostsPrimary] = useState([]);
    const [postsSecondary, setPostsSecondary] = useState([]);
    const loggedInUserId = 1;

    const drawLines = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const container = document.querySelector('.scrollable-container');
        canvas.height = container.scrollHeight; 
        canvas.width = window.innerWidth;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#FFCCE3';
        ctx.lineWidth = 3;

        postsPrimary.forEach((primaryPost) => {
            const primaryEl = primaryRefs.current[primaryPost.post_id];
            if (!primaryEl) return;

            const primaryRect = primaryEl.getBoundingClientRect();
            const canvasRect = canvas.getBoundingClientRect();

            const startX = primaryRect.left + primaryRect.width / 2 - canvasRect.left;
            const startY = primaryRect.top + primaryRect.height / 2 - canvasRect.top;
            const endX = -100; 
            const endY = startY; 

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();

            // console.log(`Line from (${startX}, ${startY}) to (${endX}, ${endY})`);
        });

        postsSecondary.forEach((secondaryPost) => {
            const secondaryEl = secondaryRefs.current[secondaryPost.post_id];
            if (!secondaryEl) return;

            const secondaryRect = secondaryEl.getBoundingClientRect();
            const canvasRect = canvas.getBoundingClientRect();

            const startX = secondaryRect.left + secondaryRect.width / 2 - canvasRect.left;
            const startY = secondaryRect.top + secondaryRect.height / 2 - canvasRect.top;
            const endX = 0; 
            const endY = startY; 

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            // console.log(`Line from (${startX}, ${startY}) to (${endX}, ${endY})`);
        });
    }, [postsPrimary, postsSecondary]); 

    useEffect(() => {
        const fetchPrimaryPosts = async () => {
            try {
                const response = await fetch(`${ process.env.REACT_APP_BACKEND_URL }/api/posts/primary`, {
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
                const response = await fetch(`${ process.env.REACT_APP_BACKEND_URL }/api/posts/secondary`, {
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

    const canvasRef = useRef(null);
    const primaryRefs = useRef({});
    const secondaryRefs = useRef({});

    useLayoutEffect(() => {
        const handleLayoutUpdate = () => {
            drawLines(); 
        };
        handleLayoutUpdate();
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                drawLines(); 
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [postsPrimary, postsSecondary, drawLines]); 

    const latestPostByUser = React.useMemo(() => {
        return postsPrimary.reduce((acc, post) => {
            if (!acc[post.sender_id] || new Date(post.created_at) > new Date(acc[post.sender_id].created_at)) {
                acc[post.sender_id] = post;
            }
            return acc;
        }, {});
    }, [postsPrimary]);

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
                                <div className="col-11 col-sm-11 col-md-9 col-lg-5">
                                    <div className="card mb-4 card-main">
                                        <div className="card-body d-flex flex-column">
                                            <div className="d-flex gap-2">
                                                <img
                                                    ref={(el) => (primaryRefs.current[primaryPost.post_id] = el)}
                                                    src={primaryPost.profile_picture || 'https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg'}
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
                                <div className="col-12 col-sm-12 col-md-9 col-lg-5 d-none d-md-none d-lg-block">
                                    {relatedSecondaryPosts.map((secondaryPost, secIndex) => (
                                        <div key={secIndex} className="card card-secondary mb-0 ms-3 me-0">
                                            <div className="card-body d-flex flex-column">
                                                <div className="d-flex gap-2">
                                                    <img
                                                        ref={(el) => (secondaryRefs.current[secondaryPost.post_id] = el)}
                                                        src={secondaryPost.profile_picture || 'https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg'}
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