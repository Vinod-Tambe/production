import React from "react";
import { Icon } from "@iconify/react";

const Header = () => {
  return (
    <header className="topbar">
      <div className="container-fluid">
        <div className="navbar-header">
          <div className="d-flex align-items-center">
            {/* Menu Toggle Button */}
            <div className="topbar-item">
              <button type="button" className="button-toggle-menu me-2">
                <Icon
                  icon="solar:hamburger-menu-broken"
                  className="fs-24 align-middle"
                />
              </button>
            </div>

            {/* Welcome Message */}
            <div className="topbar-item">
              <h4 className="fw-bold pe-none text-uppercase footer-text mb-0">
                Welcome Hr!
              </h4>
            </div>
          </div>

          <div className="d-flex align-items-center gap-1">
            {/* Light/Dark Mode Toggle */}
            <div className="topbar-item">
              <button
                type="button"
                className="topbar-button"
                id="light-dark-mode"
              >
                <Icon
                  icon="solar:moon-bold-duotone"
                  className="fs-24 align-middle"
                />
              </button>
            </div>

            {/* Notification Bell */}
            <div className="topbar-item d-none d-md-flex">
              <button
                type="button"
                className="topbar-button"
                id="theme-settings-btn"
                data-bs-toggle="offcanvas"
                data-bs-target="#theme-activity-offcanvas"
                aria-controls="theme-settings-offcanvas"
              >
                <Icon
                  icon="solar:bell-bing-bold-duotone"
                  className="fs-24 align-middle"
                />
                <span className="position-absolute topbar-badge fs-10 translate-middle badge bg-danger rounded-pill">
                  3<span className="visually-hidden">unread messages</span>
                </span>
              </button>
            </div>

            {/* User Dropdown */}
            <div className="dropdown topbar-item">
              <a
                href="#"
                className="topbar-button"
                id="page-header-user-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="d-flex align-items-center">
                  <img
                    className="rounded-circle"
                    width="32"
                    src="https://st2.depositphotos.com/1017986/8674/i/450/depositphotos_86746974-stock-photo-high-school-student-with-laptop.jpg"
                    alt="avatar"
                  />
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                <h6 className="dropdown-header">Welcome Gaston!</h6>
                <a className="dropdown-item" href="pages-profile.html">
                  <i className="bx bx-user-circle text-muted fs-18 align-middle me-1"></i>
                  <span className="align-middle">Profile</span>
                </a>
                <a className="dropdown-item" href="apps-chat.html">
                  <i className="bx bx-message-dots text-muted fs-18 align-middle me-1"></i>
                  <span className="align-middle">Messages</span>
                </a>
                <a className="dropdown-item" href="pages-pricing.html">
                  <i className="bx bx-wallet text-muted fs-18 align-middle me-1"></i>
                  <span className="align-middle">Pricing</span>
                </a>
                <a className="dropdown-item" href="pages-faqs.html">
                  <i className="bx bx-help-circle text-muted fs-18 align-middle me-1"></i>
                  <span className="align-middle">Help</span>
                </a>
                <a className="dropdown-item" href="auth-lock-screen.html">
                  <i className="bx bx-lock text-muted fs-18 align-middle me-1"></i>
                  <span className="align-middle">Lock screen</span>
                </a>
                <div className="dropdown-divider my-1"></div>
                <a
                  className="dropdown-item text-danger"
                  href="auth-signin.html"
                >
                  <i className="bx bx-log-out fs-18 align-middle me-1"></i>
                  <span className="align-middle">Logout</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
