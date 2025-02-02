import React, { useEffect, useLayoutEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

const Post = ({ post, refCallback, isPrimary, loggedInUserId, primaryFriendDisplayName }) => {
    const navigate = useNavigate();

    return (
        <div className={`card ${isPrimary ? 'card-main' : 'card-secondary'} mb-4 position-relative`}>
            {post.recipient_type === 'specific' && post.recipient_id === loggedInUserId && (
                <>
                    <div className="position-absolute top-0 start-0 m-1">
                        <iframe
                            src="https://lottie.host/embed/908fa8cd-ee9f-4cef-bc37-bf5d3958d9e6/P7ccQ3T1ss.lottie"
                            title="Sparkles"
                        ></iframe>
                    </div>
                </>
            )}
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
                        <b>{post.displayname}</b>
                        {isPrimary ? (
                            ' recommends '
                        ) : (
                            <span>, friend of <b>{primaryFriendDisplayName}</b>, recommends </span>
                        )}
                        <b>{post.title}</b>
                        {post.recipient_type === 'specific' && post.recipient_id === loggedInUserId && (
                            <>
                                <span> to <b>you</b></span>
                            </>
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
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const postsPrimary = useFetchPosts(`${process.env.REACT_APP_BACKEND_URL}/api/posts/primary`);
    const postsSecondary = useFetchPosts(`${process.env.REACT_APP_BACKEND_URL}/api/posts/secondary`);

    useEffect(() => {
        const fetchUserId = async () => {
            const userId = await fetchLoggedInUserId();
            setLoggedInUserId(userId);
        };
        fetchUserId();
    }, []);

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
                        <iframe 
                            src="https://lottie.host/embed/13172bc7-1a22-4a85-a29e-06b2b87f69c1/vTZo6mMxMt.lottie"
                            height="300px"
                            title="Magnifying glass searching web-page."
                        ></iframe>
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
                                            primaryFriendDisplayName={primaryPost.displayname} // Pass the primary friend's display name
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