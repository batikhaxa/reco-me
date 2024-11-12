import React, { useEffect, useState } from 'react';
import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';
import Select from 'react-select';

<script src="https://cdn.jsdelivr.net/gh/xcash/bootstrap-autocomplete@master/dist/latest/bootstrap-autocomplete.min.js"></script>
const Recommend = () => {
    const [title, setTitle] = useState('Title');
    const [audience, setAudience] = useState({ value: "everyone", label: "Everyone" });
    const [isSearchable] = useState(true);

    const audienceOptions =[{value:"everyone", label:"Everyone"},
                 {value:"friends", label:"Friends Only"},
                 {value:"custom", label:"Olivia"},
                 {value:"custom", label:"Ong"}            
    ]
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
    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };


    //add more tag
    
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

//autocomplete
        document.addEventListener('DOMContentLoaded', e => {
            document.getElementById('#tag_choose').autocomplete()
        }, false);


  
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
                    <div className="form-group">
                        <div className="tag-container">
                            <label htmlFor="tag-select">tags:</label>
                          
                            <input
                                type="text"
                                className="form-control"
                                placeholder="input tag..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                    style={{ backgroundColor: 'transparent'}}
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
                                {tag} <button type="button" className="btn-close btn-close-black ms-1" onClick={() => removeTag(tag)} aria-label="Remove tag"></button>
                                </label>
                            ))}
                            </div>
                        </div>

                    
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
                                        maxWidth: "200px"
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
