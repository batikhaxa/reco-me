import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';
import Select from 'react-select';

const Recommend = () => {
    const [title, setTitle] = useState('');
    const [audience, setAudience] = useState({ value: "everyone", label: "Everyone" });
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [postContent, setPostContent] = useState(""); 
    const [postResult, setPostResult] = useState('');
    const [showTagReminder, setShowTagReminder] = useState(false); 
    
    const navigate = useNavigate();

    const [audienceOptions, setAudienceOptions] = useState([
        { value: "everyone", label: "Everyone" },
        { value: "friends", label: "Friends Only" },
    ]);

    useEffect(() => {
        const element = document.querySelector('#tag_select');
        if (element) {
            new Choices(element, {
                searchEnabled: true
            });
        }
        const fetchFriends = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/friends`, {
                    method: 'GET',
                    credentials: 'include', // send cookies with the request
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("API Response:", data);

                setAudienceOptions((prevOptions) => {
                    const newOptions = data.filter((newOption) =>
                        !prevOptions.some((existingOption) => existingOption.value === newOption.value)
                    );
                    return [...prevOptions, ...newOptions];
                });
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchFriends();
    }, []);

    const handlePost = async () => {
        if (tags.length === 0) {
            setShowTagReminder(true);  
            return; 
        }

        const recipient_type =
            audience.value === "everyone" || audience.value === "friends"
                ? audience.value
                : "specific";

        const recipient_id = recipient_type === "specific" ? audience.value : null;

        const newPost = {
            recipient_type,
            recipient_id,
            title,
            content: postContent,
            tags,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.success) {
                setPostResult(
                    <>
                        Post created successfully! View it via your{' '}
                        <span
                            style={{  textDecoration: 'underline', cursor: 'pointer' }}
                            onClick={() => navigate('/profile')}
                        >
                            Profile
                        </span>
                    </>
                );
                setTitle('');
                setPostContent('');
                setTags([]);
                setAudience({ value: "everyone", label: "Everyone" });
                setShowTagReminder(false); // Hide the reminder message after posting
            }
        } catch (error) {
            console.error('Error creating post:', error);
            setPostResult('Failed to create post.');
        }
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handlePostContentChange = (event) => {
        setPostContent(event.target.value);
        const textarea = event.target;
        textarea.style.height = "auto"; // reset height
        textarea.style.height = `${textarea.scrollHeight}px`; // set height to content
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyDown = (e) => {
        if ((e.key === 'Enter' || e.key === ',') && inputValue.trim() !== "") {
            e.preventDefault(); // Prevent form submission on Enter key press
            if (!tags.includes(inputValue.trim())) {
                setTags([...tags, inputValue.trim()]);
            }
            setInputValue("");
        }
    };

    return (
        <div className="scrollable-container pt-4 pt-md-3 pt-lg-3" data-bs-offset="0">
            <div className="container mx-0 mx-sm-5 mx-lg-5 mt-5">
                <row className="m-0">
                    <div className="col-12 col-sm-12 col-md-9 col-lg-5">
                        <div 
                            id="recommend-card" 
                            className="card shadow-none p-1 mb-2" 
                            style={{ width:'100%' }}
                        >
                            <div className="card-body">
                                <form>
                                    {/* Editable title */}
                                    <div className="form-group">
                                        <input
                                            className="form-control form-control-lg bg-transparent"
                                            type="text"
                                            placeholder="Title"
                                            value={title}
                                            onChange={handleTitleChange}
                                            style={{
                                                fontSize: '1.5rem',
                                                padding: '0.8rem',
                                            }}
                                        />
                                    </div>

                                    {/* Text Input */}
                                    <div className="form-group mt-3 mb-3">
                                        <textarea
                                            className="form-control"
                                            id="postContent"
                                            placeholder="Describe what you're recommending..."
                                            rows="1"
                                            value={postContent}
                                            onChange={handlePostContentChange}
                                            style={{
                                                resize: 'none',
                                                backgroundColor: 'transparent',
                                                color: 'black',
                                                overflow: 'hidden', // prevent scrollbars
                                            }}
                                        ></textarea>
                                    </div>

                                    {/* Tags */}
                                    <div className="form-group">
                                        <div className="tag-container">
                                            <label htmlFor="tag-select" className="ms-2">tags:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="input tag..."
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                style={{ backgroundColor: 'transparent' }}
                                                autocomplete="off"
                                                id="tag-select"
                                            />
                                        </div>

                                        <div className="mt-1">
                                            {tags.map((tag, index) => (
                                                <label key={index} className="card-category d-inline-flex mb-1">
                                                    {tag}
                                                    <button
                                                        type="button"
                                                        className="btn-close btn-close-black ms-1"
                                                        onClick={() => removeTag(tag)}
                                                        aria-label="Remove tag"
                                                    ></button>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </form>

                                {/* Audience selection */}
                                <div className="row-with-btn">
                                    <div className="for-select">
                                        <Select
                                            value={audience}
                                            onChange={(selectedOption) => setAudience(selectedOption)}
                                            options={audienceOptions}
                                            placeholder="Select Audience"
                                            menuPlacement="auto"
                                            styles={{
                                                container: (base) => ({
                                                    ...base,
                                                    width: "100%",
                                                    maxWidth: "200px",
                                                }),
                                                control: (base, state) => ({
                                                    ...base,
                                                    border: "1px solid #ccc",
                                                    boxShadow: state.isFocused ? "none" : "none",
                                                    ':hover': {
                                                        borderColor: "#ccc",
                                                    },
                                                }),
                                                option: (base, state) => ({
                                                    ...base,
                                                    color: state.isSelected ? "black" : "#333333",
                                                    backgroundColor: state.isSelected ? "rgb(231, 231, 231)" : "white",
                                                    ':hover': {
                                                        backgroundColor: state.isFocused ? "rgb(245, 245, 245)" : "rgb(245, 245, 245)",
                                                    }
                                                })
                                            }}
                                        />
                                    </div>

                                    <div className="btn-container">
                                        <button className="post-btn" onClick={handlePost}>
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {showTagReminder && (
                            <div className="alert alert-warning" role="alert">
                                <span>Hey! You haven't added any tags yet.
                                Please press 'Enter' or ',' to register your tags.</span>
                            </div>
                        )}
                        <div className="m-0 p-0" id="post-result">
                            {postResult && <p className="alert alert-success text-success">{postResult}</p>}
                        </div>
                    </div>
                </row>
            </div>
        </div>
    );
};

export default Recommend;
