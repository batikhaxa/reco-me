import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import FriendButton from './friendbutton';

const PostCard = ({ user, navigate }) => (
    <div className="d-flex justify-content-left">
        <div className="card card-primary mb-2 position-relative">
            <div className="card-body p-1 pe-3">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center" key={user.user_id}>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate(`/userprofile?userId=${user.user_id}`)}
                        >
                            <img
                                src={user.profile_picture || 'default-profile-pic.jpg'}
                                alt={user.displayname}
                                width="50"
                                height="50"
                                className="rounded-circle me-2"
                            />
                        </button>
                        <span className="text fw-light fs-4">{user.displayname}</span>
                    </div>

                   
                    <div className="d-flex m-4 align-items-center">
                        <FriendButton profileUserId={user.user_id} />
                    </div>
                </div>
            </div>
        </div>
    </div>
);


const UserSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchQuery.trim() !== "") {
            e.preventDefault();
            fetchUsers(searchQuery.trim());
        }
    };

    const fetchUsers = useCallback(async (query) => {
        if (!query) return;

        setLoading(true);
        console.log("Searching for:", query);
        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/api/posts/finduser?name=${encodeURIComponent(query)}`;
            console.log("Request URL:", url);
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const columnOneUsers = users.filter((_, index) => index % 2 === 0);
    const columnTwoUsers = users.filter((_, index) => index % 2 !== 0);

   

    return (
        <div className="scrollable-container pt-4 pt-md-3 pt-lg-3" data-bs-offset="0">
            <div className="container mx-0 mx-sm-5 mx-lg-5 mt-5">
                <div className="row justify-content-start m-0"> 
                    {/* Search Bar */}
                    <div className="col-12 col-sm-12 col-md-9 col-lg-5">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <i class="bi bi-person-bounding-box"></i>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Input name..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        style={{ backgroundColor: 'transparent' }}
                                    />
                                </div>
                            </div>
                        </div>
                  

                    {/* Column 1 */}
                 
                        {loading ? (
                            <p>Loading...</p>
                        ) : columnOneUsers.length > 0 ? (
                            <div className="row">
                                {columnOneUsers.map((user, index) => (
                                    <PostCard key={index} user={user} navigate={navigate} />
                                ))}
                            </div>
                        ) : (
                            <p>No users found.</p>
                        )}
                    </div>

                    {/* Column 2 */}
                    <div className="col-12 col-md-9 col-lg-5">
                        {loading ? (
                            <p>Loading...</p>
                        ) : columnTwoUsers.length > 0 ? (
                            <div className="row">
                                {columnTwoUsers.map((user, index) => (
                                    <PostCard key={index} user={user} navigate={navigate} />
                                ))}
                            </div>
                        ) : (
                            <p></p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSearch;
