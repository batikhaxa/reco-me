import React from 'react';
import React, { useState } from 'react';

const Search = () => {
    
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log("Search by tag:", searchTerm);
        // Add logic to handle the search
    };
    return (
        
        <div className="container">
            <h1>Search Page</h1>
            <p>This is the search page content.</p>

            {/* Search Form with Icon */}
            <form className="my-3" onSubmit={handleSearchSubmit}>
                <div className="input-group">
                    <span className="input-group-text" id="basic-addon1">
                        <i className="bi bi-search"></i> {/* Bootstrap search icon */}
                    </span>
                    <input
                        type="search"
                        className="form-control"
                        placeholder="Search by tag"
                        aria-label="Search"
                        aria-describedby="basic-addon1"
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                    />
                    <button className="btn btn-outline-primary" type="submit">Search</button>
                </div>
            </form>

            {/* Display the current search term */}
            {searchTerm && (
                <p>Results for: <strong>{searchTerm}</strong></p>
            )}

            {/* You can display search results or filter content here */}
        </div>
    );
};

export default Search;
