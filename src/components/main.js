// src/components/Main.js
import React, { useEffect, useState, useRef} from 'react';

const Main = () => {
    const [postsPrimary, setPostsPrimary] = useState([]);
    const [postsSecondary, setPostsSecondary] = useState([]);
    const primaryRefs = useRef([]);
    const loggedInUserId = 1;


    

    const getPrimaryCardPosition = (sourceFriendId) => {
        const matchedIndex = postsPrimary.findIndex(
            (post) => post.displayname === sourceFriendId
        );
        if (matchedIndex !== -1 && primaryRefs.current[matchedIndex]) {
            return primaryRefs.current[matchedIndex].getBoundingClientRect();
        }
        return null;
    };
    

    //making a line
    const renderLine = (index) => (
        <div className='flex-start'
            style={{
                position:"absolute",
                top: "calc(100vh+20%)", // Place it at the center vertically of the card
                left: "-20%",  // Align to the left side of the card
                width: "150px",  // length
                height: "4px",  //thickness
                backgroundColor: "red",
                transform: "translateY(70px)",  // Adjust the position of the line align to the card
                zIndex: -1,  // Ensure it is behind the content of the card
            }}
        />
    );
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
    //move the secondary card depending on friend

   

    return (  
       
   
        <div className="scrollable-container m-4" data-bs-offset="0" style={{position:"relative" }}>
            
            <div className="container m-3" >
                <div className="row">
                    <div className="col  ">
                  
                        {/* map through posts */}
                    
                        {postsPrimary.map((post, index) => (
                            <div key={index} className="d-flex justify-content-start" style={{position:"relative" }} ref={(el) => (primaryRefs.current[index] = el)}>
                                  {renderLine(index)}
                                <div className="card card-primary mb-5" >

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
                                                <a href="/comments" className="link-icon">
                                                    <i>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="30"
                                                            height="30"
                                                            fill="black"
                                                            className="bi bi-chat-dots"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                                            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                                                        </svg>
                                                    </i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Friends friends */}

                    
                    <div className="col ms-5">
                        {postsSecondary.map((post, index) => (
                            
                            
                            <div key={index} className="d-flex justify-content-start"
                            style={getPrimaryCardPosition(post.sourceFriendId)
                                    ? {
                                        position: 'absolute',
                                        top: `${getPrimaryCardPosition(post.sourceFriendDisplayName).top}px`,
                                        left: `${getPrimaryCardPosition(post.sourceFriendDisplayName).left + 300}px`, // Adjust offset as needed
                                        transform: 'translateY(-50%)', // Center vertically relative to the primary card
                                        zIndex: 1
                                      }
                                    : { position: 'relative'}

                                       }
                            >
                                <div className="card card-secondary mb-3">
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
                                                <b>{post.displayname}</b>, friend of
                                                @: <b>{post.sourceFriendDisplayName}</b>, is recommending <b>{post.title}</b>
                                                {post.recipient_type === 'specific' && post.recipient_id === loggedInUserId ? (
                                                    <span> to <b>you</b></span>  // Show "to you" if recipient is the logged-in user
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
                                                <a href="/comments" className="link-icon">
                                                    <i>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="30"
                                                            height="30"
                                                            fill="black"
                                                            className="bi bi-chat-dots"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                                            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                                                        </svg>
                                                    </i>
                                                </a>
                                            </div>
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
