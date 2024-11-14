import React, { useEffect, useState } from 'react';
import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';
import Select from 'react-select';

<script src="https://cdn.jsdelivr.net/gh/xcash/bootstrap-autocomplete@master/dist/latest/bootstrap-autocomplete.min.js"></script>

const Recommend = () => {
    const [title, setTitle] = useState('');
    const [audience, setAudience] = useState({ value: "everyone", label: "Everyone" });
    const [isSearchable] = useState(true);
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const audienceOptions = [
        { value: "everyone", label: "Everyone" },
        { value: "friends", label: "Friends Only" },
        { value: "custom1", label: "Olivia" },
        { value: "custom2", label: "Ong" }
    ];

    useEffect(() => {
        const element = document.querySelector('#tag_select');
        if (element) {
            new Choices(element, {
                searchEnabled: true
            });
        }
    }, []); 

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
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
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('#tag_choose').autocomplete();
        }, false);
    };

    return (
        <div className="container m-5">
            <div id="recommend-card" className="card shadow-none p-1" style={{ width: '500px' }}>
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
                                rows="3"
                                style={{
                                    resize: 'none',
                                    backgroundColor: 'transparent', 
                                    color: 'black', // Text color
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
                                isSearchable={isSearchable}
                                menuPlacement="auto"
                                styles={{
                                    container: (base) => ({
                                        ...base,
                                        width: "100%",
                                        maxWidth: "200px",
                                    }),
                                    control: (base, state) => ({
                                        ...base,
                                        border: "1px solid #ccc", // Set a custom border color or none
                                        boxShadow: state.isFocused ? "none" : "none", // Remove focus outline
                                        ':hover': {
                                            borderColor: "#ccc", // Optionally change the border color on hover
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
                            <button className="post-btn">Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recommend;
