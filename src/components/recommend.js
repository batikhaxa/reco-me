import React, { useEffect, useState } from 'react';
import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';
import Select from 'react-select';
import axios from 'axios';

const Recommend = () => {
    const [title, setTitle] = useState('');
    const [audience, setAudience] = useState({ value: "everyone", label: "Everyone" });
    const [isSearchable] = useState(true);
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [postContent, setPostContent] = useState(""); 
    const [postResult, setPostResult] = useState(''); 

    const [audienceOptions, setAudienceOptions] = useState([
        { value: "everyone", label: "Everyone" },
        { value: "friends", label: "Friends Only" },
    ]);

    const loggedInUserId = 1; // temp!!

    useEffect(() => {
        const element = document.querySelector('#tag_select');
        if (element) {
            new Choices(element, {
                searchEnabled: true
            });
        }
        const fetchFriends = async (userId) => {
            try {
                console.log("fetchFriends called");
                const response = await fetch(`/api/friends?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
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

        fetchFriends(loggedInUserId);
    }, []);

    const handlePost = async () => {
        const recipient_type =
            audience.value === "everyone" || audience.value === "friends"
                ? audience.value
                : "specific";

        const recipient_id = recipient_type === "specific" ? audience.value : null;

        const newPost = {
            sender_id: loggedInUserId,
            recipient_type,
            recipient_id,
            title,
            content: postContent,
            tags,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/posts', newPost);
            if (response.data.success) {
                // Set the success message
                setPostResult('Post created successfully!');
                // Clear fields after successful post
                setTitle('');
                setPostContent('');
                setTags([]);
                setAudience({ value: "everyone", label: "Everyone" });
            }
        } catch (error) {
            console.error('Error creating post:', error);
            // Set the error message
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
        if (e.key === 'Enter' && inputValue.trim() !== "") {
            e.preventDefault();
            if (!tags.includes(inputValue.trim())) {
                setTags([...tags, inputValue.trim()]);
            }
            setInputValue("");
        }
    };

    return (
        <div className="scrollable-container" data-bs-offset="0">
            <div className="container m-5">
                <div id="recommend-card" className="card shadow-none p-1" style={{ width: '500px', marginBottom: '200px' }}>
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
                                        list="media_list"
                                    />
                                    <datalist id="media_list">
                                        <option>games</option>
                                        <option>anime</option>
                                        <option>movies</option>
                                        <option>music</option>
                                        <option>books</option>
                                        <option>sports</option>
                                    </datalist>
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
                <div className="mt-2 ms-2" id="post-result">
                    {postResult && <p>{postResult}</p>} {/* Display the result message */}
                </div>
            </div>
        </div>
    );
};

export default Recommend;
