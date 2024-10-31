import React, { useEffect, useState } from 'react';
import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';

const Recommend = () => {
    const [title, setTitle] = useState('Title');

    useEffect(() => {
        const element = document.querySelector('#tag_select');
        if (element) {
            new Choices(element, {
                searchEnabled: true
            });
        }
    }, []); // ensures Choices is initialized after the component mounts


    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    return (
        <div className="container" style={{ paddingTop: '3em' }}>
            <div id="recommend-card" className="card shadow-none p-1" style={{ marginLeft: '100px', width: '500px' }}>
                <div className="card-body">
                    {/* Editable title */}
                    <h2
                        className="editable-title"
                        contentEditable="true"
                        suppressContentEditableWarning={true}
                        onInput={handleTitleChange}
                    >
                        {title}
                    </h2>   
                    <div className="form-floating mb-3">
                        <textarea
                            className="form-control"
                            data-live-search="true"
                            placeholder="Describing what you're recommending..."
                            id="inserting"
                            style={{ height: '80px' }}
                        ></textarea>
                    </div>
                    {/* Changed in custom-choices.css */}
                    <div className="tag-container">
                        <label htmlFor="tag_select">tags:</label>
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
                    </div>

                    <div className="selected-tags" id="selected-tags"></div>
                    <hr />
                    <div className="row-with-btn">
                        <div className="for-select">
                            <select className="form-select" aria-label="audience select">
                                <option value="everyone">Everyone</option>
                                <option value="friends">Friends Only</option>
                                <option value="others">@olivia</option>
                            </select>
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
