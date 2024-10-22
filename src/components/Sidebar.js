import React from 'react';

const Sidebar = () => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary bg-gradient" style={{ width: '280px' }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-3 me-md-auto link-body-emphasis text-decoration-none">
                <img src="/icon/icon.png" className="bi pe-none me-2" width="60" height="60" alt="Icon" />
                <span className="fs-4">reco.me</span>
            </a>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="#" className="nav-link active" aria-current="page">
                        <img className="nav-icon" src="/node_modules/bootstrap-icons/icons/house.svg" alt="home" />
                        home
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link link-body-emphasis">
                        <img className="nav-icon" src="/node_modules/bootstrap-icons/icons/hand-thumbs-up.svg" alt="recommend" />
                        recommend
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link link-body-emphasis">
                        <img className="nav-icon" src="/node_modules/bootstrap-icons/icons/search-heart.svg" alt="search" />
                        search
                    </a>
                </li>
            </ul>
            <hr />
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://i.pinimg.com/736x/d1/51/47/d151474e2d22d12412425632275f6cff.jpg" alt="" width="50" height="50" className="rounded-circle me-2" />
                    <strong>niko</strong>
                </a>
                <ul className="dropdown-menu text-small shadow">
                    <li><a className="dropdown-item" href="#">settings</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">sign out</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
