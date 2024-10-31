import React, { useState } from 'react';

const Search = () => {
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== "") {
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

    return (
        <div className="container" style={{ padding: '2em', paddingLeft: '3em', paddingTop: '4em' }}>
            <div className="card" style={{ width: "30rem" }}>
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search-heart me-2" viewBox="0 0 16 16">
                            <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018" />
                            <path d="M13 6.5a6.47 6.47 0 0 1-1.258 3.844q.06.044.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11" />
                        </svg>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="input tag..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            style={{ backgroundColor: 'transparent' }}
                        />
                    </div>
                    <div className="mt-1">
                        {tags.map((tag, index) => (
                            <label key={index} className="card-category d-inline-flex bottom-1 mb-3 pr-2">
                                {tag} <button type="button" className="btn-close btn-close-black ms-1" onClick={() => removeTag(tag)} aria-label="Remove tag"></button>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
