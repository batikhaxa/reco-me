import React, { useState, useEffect } from "react";

const Notifications = ({ show, onClose }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (show) {
            const fetchNotifications = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/friends/pending`, {
                        method: "GET",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                    });

                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                    const data = await response.json();
                    setNotifications(data);
                } catch (error) {
                    console.error("Error fetching notifications:", error);
                    setError("Failed to fetch notifications");
                } finally {
                    setLoading(false);
                }
            };

            fetchNotifications();
        }
    }, [show]);

    const handleFriendRequest = async (friendshipId, action) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/friends/${friendshipId}/${action}`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            setNotifications((prev) => prev.filter((n) => n.friendship_id !== friendshipId));
        } catch (error) {
            console.error(`Error ${action}ing friend request:`, error);
        }
    };

    const getTimeDifference = (timestamp) => {
        const now = new Date();
        const requestTime = new Date(timestamp);
        const requestUTC = Date.UTC(
            requestTime.getFullYear(), requestTime.getMonth(), requestTime.getDate(),
            requestTime.getHours(), requestTime.getMinutes(), requestTime.getSeconds()
        );
        const differenceInSeconds = Math.floor((now - requestUTC) / 1000);

        if (differenceInSeconds < 60) return `${differenceInSeconds} seconds ago`;
        if (differenceInSeconds < 3600) return `${Math.floor(differenceInSeconds / 60)} minutes ago`;
        if (differenceInSeconds < 86400) return `${Math.floor(differenceInSeconds / 3600)} hours ago`;
        return `${Math.floor(differenceInSeconds / 86400)} days ago`;
    };

    if (!show) return null;

    return (
        <div className="modal-backdrop"
            style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1040 }}
            onClick={onClose}
        >
            <div className="modal d-block" tabIndex="-1" style={{ zIndex: 1050 }} onClick={(e) => e.stopPropagation()}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content"
                        style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title text-lowercase">
                                <i className="bi bi-bell-fill"></i> Notifications
                            </h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            {loading ? <p>Loading notifications...</p> :
                                error ? <p>{error}</p> :
                                    notifications.length > 0 ? (
                                        notifications.map(({ friendship_id, requester_name, created_at }) => (
                                            <div key={friendship_id} className="mb-3">
                                                <p>You have a friendship request from <strong>{requester_name}</strong>.</p>
                                                <button className="btn btn-outline-dark rounded me-2"
                                                    onClick={() => handleFriendRequest(friendship_id, "accept")}>
                                                    <i className="bi bi-check p-0 m-0"></i>
                                                </button>
                                                <button className="btn btn-outline-dark rounded me-2"
                                                    onClick={() => handleFriendRequest(friendship_id, "reject")}>
                                                    <i className="bi bi-x p-0 m-0"></i>
                                                </button>
                                                <small className="text-muted">{getTimeDifference(created_at)}</small>
                                            </div>
                                        ))
                                    ) : 
                                        <p>No new notifications 🦋</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notifications;
