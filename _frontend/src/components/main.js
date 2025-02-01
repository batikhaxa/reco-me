import React, { useEffect, useLayoutEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

const Post = ({ post, refCallback, isPrimary, loggedInUserId }) => {
    const navigate = useNavigate();
    return (
        <div className={`card ${isPrimary ? 'card-main' : 'card-secondary'} mb-4`}>
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
                            ref={refCallback}
                            src={post.profile_picture || 'default-profile-pic.jpg'}
                            alt="Profile-Picture"
                            width="70"
                            height="70"
                            className="object-fit-fill rounded-circle me-2"
                        />
                    </button>
                    <h5 className="card-title">
                        <b>{post.displayname}</b> {isPrimary ? 'recommends' : ', friend of'} <b>{post.title}</b>
                        {post.recipient_type === 'specific' && post.recipient_id === loggedInUserId && (
                            <span> to <b>you</b></span>
                        )}
                    </h5>
                </div>
                <p
                    className="card-text"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(post.content.replace(/\n/g, '<br>')),
                    }}
                ></p>
                <div className="d-flex flex-wrap pb-2">
                    {(post.tags?.split(', ') || ['Unknown']).map((tag, tagIndex) => (
                        <label key={tagIndex} className="card-category d-inline-flex mb-1">
                            <i className="bi bi-hash"></i> {tag}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

const fetchPosts = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
};

const useFetchPosts = (url) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchPosts(url);
            setPosts(data);
        };
        fetchData();
    }, [url]);

    return posts;
};

const Main = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
        script.type = "module";
        document.body.appendChild(script);
    }, []);

    const loggedInUserId = 1;
    const postsPrimary = useFetchPosts(`${process.env.REACT_APP_BACKEND_URL}/api/posts/primary`);
    const postsSecondary = useFetchPosts(`${process.env.REACT_APP_BACKEND_URL}/api/posts/secondary`);

    const drawLines = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const container = document.querySelector('.scrollable-container');
        canvas.height = container.scrollHeight;
        canvas.width = window.innerWidth;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#FFCCE3';
        ctx.lineWidth = 3;

        const drawLineForPost = (post, refs, endX) => {
            const el = refs[post.post_id];
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const canvasRect = canvas.getBoundingClientRect();

            const startX = rect.left + rect.width / 2 - canvasRect.left;
            const startY = rect.top + rect.height / 2 - canvasRect.top;
            const endY = startY;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        };

        postsPrimary.forEach((primaryPost) => drawLineForPost(primaryPost, primaryRefs.current, -100));
        postsSecondary.forEach((secondaryPost) => drawLineForPost(secondaryPost, secondaryRefs.current, 0));
    }, [postsPrimary, postsSecondary]);

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
            {postsPrimary.length === 0 ? (
                <div className="mx-3 mx-sm-5 mx-lg-5 mt-5 w-80 text-center text-muted">
                    <div className="d-flex justify-content-center align-items-center">
                        <dotlottie-player
                            src="https://lottie.host/13172bc7-1a22-4a85-a29e-06b2b87f69c1/vTZo6mMxMt.lottie"
                            background="transparent"
                            speed="1"
                            style={{ width: 300 }}
                            loop
                            autoplay
                        ></dotlottie-player>
                    </div>
                    <p>No posts available! To find new friends, go to the <a href="/explore">Explore</a> page or add existing friends via the <a href="/friends">Friends</a> page.</p>
                </div>
            ) : (
                <div className="d-none"> </div>
            )}
            <canvas
                ref={canvasRef}
                id="connection-lines"
                style={{ position: 'absolute', zIndex: -1, top: 0, left: 0 }}
            />
            <div className="container mx-0 mx-sm-5 mx-lg-5 mt-5">
                <div className="row justify-content-start">
                    {postsPrimary.map((primaryPost, index) => {
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
                                    <Post
                                        post={primaryPost}
                                        refCallback={(el) => (primaryRefs.current[primaryPost.post_id] = el)}
                                        isPrimary={true}
                                        loggedInUserId={loggedInUserId}
                                    />
                                </div>

                                {/* Secondary Posts */}
                                <div className="col-12 col-sm-12 col-md-9 col-lg-5 d-none d-md-none d-lg-block">
                                    {relatedSecondaryPosts.map((secondaryPost, secIndex) => (
                                        <Post
                                            key={secIndex}
                                            post={secondaryPost}
                                            refCallback={(el) => (secondaryRefs.current[secondaryPost.post_id] = el)}
                                            isPrimary={false}
                                            loggedInUserId={loggedInUserId}
                                        />
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