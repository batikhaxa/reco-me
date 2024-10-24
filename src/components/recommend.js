import React, { useEffect } from 'react';
import Choices from 'choices.js'; 
import 'choices.js/public/assets/styles/choices.min.css'; 

const Recommend = () => {
    useEffect(() => {
        const element = document.querySelector('#tag_select');
        if (element) {
            new Choices(element, {
                searchEnabled: true
            });
        }
    }, []); // ensures Choices is initialized after the component mounts

    return (
        <div className="container" style={{ paddingTop: '3em' }}>
            <div className="card shadow-none border" style={{ marginLeft: '100px', width: '500px' }}>
                <div className="card-body">
                    <h1>Title</h1>
                    <div className="form-floating mb-3">
                        <textarea
                            className="form-control"
                            data-live-search="true"
                            placeholder="Describing what you're recommending..."
                            id="inserting"
                            style={{ height: '80px' }}
                        ></textarea>
                    </div>

                    <label htmlFor="tag_select">Tags:</label>
                    <div className="select-picker">
                        <select id="tag_select" data-live-search="true">
                            <option>games</option>
                            <option>anime</option>
                            <option>movies</option>
                            <option>music</option>
                            <option>books</option>
                            <option>sports</option>
                            <option value="others">others</option>
                        </select>
                    </div>

                    <div className="selected-tags" id="selected-tags"></div>
                    <hr />

                    <div className="row-with-btn">
                        <div className="for-select">
                            <span>for:</span>
                            <select className="form-select" aria-label="Audience select">
                                <option value="everyone">Everyone</option>
                                <option value="friends">Friends only</option>
                                <option value="others">@</option>
                            </select>
                        </div>

                        <div className="btn-container">
                            <button className="btn">Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recommend;
