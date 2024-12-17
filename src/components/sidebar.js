import React from "react";
import { NavLink } from "react-router-dom";

const NavPills = () => (
    <ul className="nav nav-pills flex-column mb-auto fw-semiboldf fs-5 fs-sm-6">
        <li className="nav-item">
            <NavLink
                to="/home"
                className="nav-link link-body-emphasis"
                activeClassName="active"
            >
                <i className="bi bi-house"></i>
                home
            </NavLink>
        </li>
        <li className="nav-item">
            <NavLink
                to="/recommend"
                className="nav-link link-body-emphasis"
                activeClassName="active"
            >
                <i className="bi bi-hand-thumbs-up"></i>
                recommend
            </NavLink>
        </li>
        <li className="nav-item">
            <NavLink
                to="/search"
                className="nav-link link-body-emphasis"
                activeClassName="active"
            >
                <i className="bi bi-search-heart"></i>
                search
            </NavLink>
        </li>
    </ul>
);


const UserDropdown = () => (
    <div className="dropdown mt-auto">
        <a
            href="#"
            className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            <img
                src="https://i.pinimg.com/736x/d1/51/47/d151474e2d22d12412425632275f6cff.jpg"
                alt=""
                width="50"
                height="50"
                className="rounded-circle me-2 ms-2"
            />
            <strong className="text-white fw-light fs-4">niko</strong>
        </a>
        <ul className="dropdown-menu ms-5 text-small shadow">
            <li>
                <a className="dropdown-item" href="/settings">
                    settings
                </a>
            </li>
            <li>
                <hr className="dropdown-divider" />
            </li>
            <li>
                <a className="dropdown-item" href="/logout">
                    log out
                </a>
            </li>
        </ul>
    </div>
);

const Sidebar = () => {
    return (
        <>
            {/* Sticky top button for small and medium screens */}
            <div
                className="sticky-top position-absolute btn d-md-none d-flex justify-content-start align-items-center w-100"
                id="menu-toggle-button"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasSidebar"
                aria-controls="offcanvasSidebar"
                style={{
                    zIndex: 1030, // Ensures it's above regular content but below the sidebar when toggled
                }}
            >
                <i
                    className="bi bi-list me-2"
                    style={{ fontSize: "3rem" }}
                ></i>
                <img
                    src="/img/iconblack.png"
                    className="bi pe-none m-1"
                    width="50"
                    height="50"
                    alt="icon"
                />
            </div>

            {/* Toggled sidebar for small and medium screens */}
            <div
                className="offcanvas offcanvas-start bg-body-tertiary bg-gradient d-flex flex-column"
                tabIndex="-1"
                id="offcanvasSidebar"
                aria-labelledby="offcanvasSidebarLabel"
                style={{
                    zIndex: 1050, // Higher z-index so it appears above the button
                }}
            >
                <div className="offcanvas-header">
                    <a
                        href="/"
                        className="d-flex align-items-center link-body-emphasis text-decoration-none"
                    >
                        <img
                            src="/img/icon.png"
                            className="bi pe-none me-2"
                            width="60"
                            height="60"
                            alt="icon"
                        />
                        <span id="sidebar-title" className="fs-2">reco.me</span>
                    </a>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body d-flex flex-column">
                    <NavPills />
                    <div className="mt-auto">
                        <hr />
                        <UserDropdown />
                    </div>
                </div>
            </div>

            {/* Sidebar for larger screens */}
            <div
                className="flex-shrink-0 p-3 bg-body-tertiary bg-gradient d-none d-md-flex flex-column"
                style={{ width: "300px", height: "100vh" }}
            >
                <a
                    href="/"
                    className="d-flex align-items-center mb-3 mb-md-3 me-md-auto link-body-emphasis text-decoration-none"
                >
                    <img
                        src="/img/icon.png"
                        className="bi pe-none me-2"
                        width="70"
                        height="70"
                        alt="icon"
                    />
                    <span id="sidebar-title" className="fs-3">reco.me</span>
                </a>
                <div className="offcanvas-body d-flex flex-column">
                    <NavPills />
                    <div className="mt-auto">
                        <hr />
                        <UserDropdown />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
